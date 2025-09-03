import React, { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

interface TargetCursorProps {
  targetSelector: string
  spinDuration?: number
  hideDefaultCursor?: boolean
}

export default function TargetCursor({ 
  targetSelector, 
  spinDuration = 1.6, 
  hideDefaultCursor = true 
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const centerDotRef = useRef<HTMLDivElement | null>(null)
  const cornerBracketsRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const isHoveringTarget = useRef(false)
  const targetElement = useRef<HTMLElement | null>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  
  // GSAP Timeline'ları cache'lemek için
  const idleSpinTL = useRef<gsap.core.Timeline | null>(null)
  const hoverTL = useRef<gsap.core.Timeline | null>(null)
  const clickTL = useRef<gsap.core.Timeline | null>(null)

  // Touch device detection
  const isTouchDevice = useCallback(() => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }, [])

  // Input element detection
  const isInputElement = useCallback((el: Element) => {
    const tagName = el.tagName.toLowerCase()
    return ['input', 'textarea', 'select', 'button'].includes(tagName) ||
           el.hasAttribute('contenteditable')
  }, [])

  // RAF throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current.x = e.clientX
    mousePos.current.y = e.clientY

    if (rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      const cursor = cursorRef.current
      if (!cursor) return

      if (isHoveringTarget.current && targetElement.current) {
        const targetRect = targetElement.current.getBoundingClientRect()
        const targetCenterX = targetRect.left + targetRect.width / 2
        const targetCenterY = targetRect.top + targetRect.height / 2
        
        // Çok düşük paralaks (0.00005)
        const parallaxX = (mousePos.current.x - targetCenterX) * 0.00005
        const parallaxY = (mousePos.current.y - targetCenterY) * 0.00005
        
        gsap.set(cursor, {
          x: targetCenterX + parallaxX,
          y: targetCenterY + parallaxY,
          xPercent: -50,
          yPercent: -50
        })
      } else {
        gsap.set(cursor, {
          x: mousePos.current.x,
          y: mousePos.current.y,
          xPercent: -50,
          yPercent: -50
        })
      }

      rafRef.current = null
    })
  }, [])

  // Mouse enter target handler
  const handleMouseEnterTarget = useCallback((e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement
    const targetRect = target.getBoundingClientRect()
    
    isHoveringTarget.current = true
    targetElement.current = target

    // Stop idle spin
    idleSpinTL.current?.pause()

    // Animate brackets to target bounds
    if (hoverTL.current) {
      hoverTL.current.kill()
    }

    hoverTL.current = gsap.timeline()
    hoverTL.current.to(cornerBracketsRef.current, {
      width: targetRect.width + 8,
      height: targetRect.height + 8,
      duration: 0.3,
      ease: 'power2.easeOut'
    })
  }, [])

  // Mouse leave target handler
  const handleMouseLeaveTarget = useCallback(() => {
    isHoveringTarget.current = false
    targetElement.current = null

    // Resume idle spin
    idleSpinTL.current?.play()

    // Reset brackets
    if (hoverTL.current) {
      hoverTL.current.kill()
    }

    hoverTL.current = gsap.timeline()
    hoverTL.current.to(cornerBracketsRef.current, {
      width: 24,
      height: 24,
      duration: 0.2,
      ease: 'power2.easeOut'
    })
  }, [])

  // Click handler
  const handleClick = useCallback(() => {
    if (!isHoveringTarget.current) return

    if (clickTL.current) {
      clickTL.current.kill()
    }

    clickTL.current = gsap.timeline()
    clickTL.current
      .to(centerDotRef.current, {
        scale: 0.7,
        duration: 0.1,
        ease: 'power2.easeOut'
      })
      .to(cornerBracketsRef.current, {
        scale: 0.9,
        duration: 0.1,
        ease: 'power2.easeOut'
      }, 0)
      .to([centerDotRef.current, cornerBracketsRef.current], {
        scale: 1,
        duration: 0.2,
        ease: 'power2.easeOut'
      })
  }, [])

  useEffect(() => {
    // Touch device'larda devre dışı bırak
    if (isTouchDevice()) return

    const cursor = cursorRef.current
    const centerDot = centerDotRef.current
    const brackets = cornerBracketsRef.current

    if (!cursor || !centerDot || !brackets) return

    // Hide default cursor
    if (hideDefaultCursor) {
      document.documentElement.style.cursor = 'none'
      document.body.style.cursor = 'none'
    }

    // Initialize cursor position
    gsap.set(cursor, { x: 0, y: 0, xPercent: -50, yPercent: -50 })

    // Setup idle spin animation (360° sürekli dönüş)
    idleSpinTL.current = gsap.timeline({ repeat: -1 })
    idleSpinTL.current.to(brackets, {
      rotation: 360,
      duration: spinDuration,
      ease: 'none'
    })

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('click', handleClick)

    // Setup target element listeners
    const updateTargetListeners = () => {
      const targets = document.querySelectorAll(targetSelector)
      
      targets.forEach(target => {
        // Skip input elements
        if (isInputElement(target)) return

        target.addEventListener('mouseenter', handleMouseEnterTarget as EventListener)
        target.addEventListener('mouseleave', handleMouseLeaveTarget as EventListener)
      })
    }

    updateTargetListeners()

    // MutationObserver to handle dynamic content
    const observer = new MutationObserver(() => {
      updateTargetListeners()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Cleanup
    return () => {
      if (hideDefaultCursor) {
        document.documentElement.style.cursor = ''
        document.body.style.cursor = ''
      }

      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)

      // Remove target listeners
      const targets = document.querySelectorAll(targetSelector)
      targets.forEach(target => {
        target.removeEventListener('mouseenter', handleMouseEnterTarget as EventListener)
        target.removeEventListener('mouseleave', handleMouseLeaveTarget as EventListener)
      })

      // Kill GSAP timelines
      idleSpinTL.current?.kill()
      hoverTL.current?.kill()
      clickTL.current?.kill()

      // Cancel RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      observer.disconnect()
    }
  }, [targetSelector, spinDuration, hideDefaultCursor, handleMouseMove, handleMouseEnterTarget, handleMouseLeaveTarget, handleClick, isTouchDevice, isInputElement])

  // Touch device'larda render etme
  if (isTouchDevice()) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      className="target-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '32px',
        height: '32px',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference'
      }}
    >
      {/* Center dot */}
      <div
        ref={centerDotRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '4px',
          height: '4px',
          background: '#fff',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Corner brackets */}
      <div
        ref={cornerBracketsRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '24px',
          height: '24px',
          transform: 'translate(-50%, -50%)',
          border: '2px solid #fff',
          borderRadius: '2px'
        }}
      >
        {/* Top-left bracket */}
        <div style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          width: '8px',
          height: '8px',
          borderTop: '2px solid #fff',
          borderLeft: '2px solid #fff'
        }} />
        
        {/* Top-right bracket */}
        <div style={{
          position: 'absolute',
          top: '-2px',
          right: '-2px',
          width: '8px',
          height: '8px',
          borderTop: '2px solid #fff',
          borderRight: '2px solid #fff'
        }} />
        
        {/* Bottom-left bracket */}
        <div style={{
          position: 'absolute',
          bottom: '-2px',
          left: '-2px',
          width: '8px',
          height: '8px',
          borderBottom: '2px solid #fff',
          borderLeft: '2px solid #fff'
        }} />
        
        {/* Bottom-right bracket */}
        <div style={{
          position: 'absolute',
          bottom: '-2px',
          right: '-2px',
          width: '8px',
          height: '8px',
          borderBottom: '2px solid #fff',
          borderRight: '2px solid #fff'
        }} />
      </div>
    </div>
  )
}
