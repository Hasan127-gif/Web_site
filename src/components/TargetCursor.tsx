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
  const isInNavArea = useRef(false)
  
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

  // Nav area detection - sadece nav container içinde
  const isInsideNav = useCallback((element: Element) => {
    return element.closest('.pill-nav-container') !== null
  }, [])

  // Target detection - pill, auth-action, pill-logo elementleri
  const isTargetElement = useCallback((element: Element) => {
    return element.matches(targetSelector) || element.closest(targetSelector) !== null
  }, [targetSelector])

  // RAF throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current.x = e.clientX
    mousePos.current.y = e.clientY

    // Nav alanında mı kontrol et
    const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY)
    const inNav = elementUnderMouse ? isInsideNav(elementUnderMouse) : false
    isInNavArea.current = inNav

    // Target element detection
    const onTarget = elementUnderMouse ? isTargetElement(elementUnderMouse) : false

    if (rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      const cursor = cursorRef.current
      if (!cursor) return

      // Sadece nav alanında görünür yap
      if (inNav) {
        cursor.style.opacity = '1'
        cursor.style.visibility = 'visible'
      } else {
        cursor.style.opacity = '0'
        cursor.style.visibility = 'hidden'
        isHoveringTarget.current = false
        targetElement.current = null
        // Resume idle spin when leaving nav
        idleSpinTL.current?.play()
        return
      }

      // Target üzerindeyken otomatik hizalama
      if (onTarget && elementUnderMouse) {
        const targetRect = elementUnderMouse.getBoundingClientRect()
        const targetCenterX = targetRect.left + targetRect.width / 2
        const targetCenterY = targetRect.top + targetRect.height / 2
        
        // Otomatik hizalama - hedef merkeze sabitle
        gsap.set(cursor, {
          x: targetCenterX,
          y: targetCenterY,
          xPercent: -50,
          yPercent: -50
        })

        // Target değişti mi kontrol et
        if (targetElement.current !== elementUnderMouse) {
          targetElement.current = elementUnderMouse as HTMLElement
          isHoveringTarget.current = true

          // Stop idle spin
          idleSpinTL.current?.pause()

          // Animate brackets to target bounds
          if (hoverTL.current) {
            hoverTL.current.kill()
          }

          hoverTL.current = gsap.timeline()
          hoverTL.current.to(cornerBracketsRef.current, {
            width: targetRect.width + 6,
            height: targetRect.height + 6,
            duration: 0.25,
            ease: 'power2.easeOut'
          })
        }
      } else {
        // Target dışında - normal mouse tracking
        gsap.set(cursor, {
          x: mousePos.current.x,
          y: mousePos.current.y,
          xPercent: -50,
          yPercent: -50
        })

        // Target'tan çıktı mı?
        if (isHoveringTarget.current) {
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
            width: 18,
            height: 18,
            duration: 0.2,
            ease: 'power2.easeOut'
          })
        }
      }

      rafRef.current = null
    })
  }, [isInsideNav, isTargetElement])

  // Click handler
  const handleClick = useCallback(() => {
    if (!isHoveringTarget.current || !isInNavArea.current) return

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

    // Hide default cursor only in nav area
    if (hideDefaultCursor) {
      const style = document.createElement('style')
      style.setAttribute('data-target-cursor', 'true')
      style.textContent = `
        .pill-nav-container * {
          cursor: none !important;
        }
      `
      document.head.appendChild(style)
    }

    // Initialize cursor position - başlangıçta gizli
    gsap.set(cursor, { 
      x: 0, 
      y: 0, 
      xPercent: -50, 
      yPercent: -50,
      opacity: 0,
      visibility: 'hidden'
    })

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

    // Cleanup
    return () => {
      if (hideDefaultCursor) {
        const existingStyle = document.querySelector('style[data-target-cursor]')
        if (existingStyle) {
          existingStyle.remove()
        }
      }

      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)

      // Kill GSAP timelines
      idleSpinTL.current?.kill()
      hoverTL.current?.kill()
      clickTL.current?.kill()

      // Cancel RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [targetSelector, spinDuration, hideDefaultCursor, handleMouseMove, handleClick, isTouchDevice, isInsideNav, isTargetElement])

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
        width: '24px', /* Daha da küçültüldü */
        height: '24px', /* Daha da küçültüldü */
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        opacity: 0,
        visibility: 'hidden'
      }}
    >
      {/* Center dot */}
      <div
        ref={centerDotRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '3px', /* Küçültüldü */
          height: '3px', /* Küçültüldü */
          background: '#fff',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Corner brackets - daha küçük */}
      <div
        ref={cornerBracketsRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '18px', /* Küçültüldü */
          height: '18px', /* Küçültüldü */
          transform: 'translate(-50%, -50%)',
          border: 'none',
          borderRadius: '2px'
        }}
      >
        {/* Top-left bracket */}
        <div style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '5px', /* Küçültüldü */
          height: '5px', /* Küçültüldü */
          borderTop: '1.5px solid #fff',
          borderLeft: '1.5px solid #fff'
        }} />
        
        {/* Top-right bracket */}
        <div style={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          width: '5px', /* Küçültüldü */
          height: '5px', /* Küçültüldü */
          borderTop: '1.5px solid #fff',
          borderRight: '1.5px solid #fff'
        }} />
        
        {/* Bottom-left bracket */}
        <div style={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          width: '5px', /* Küçültüldü */
          height: '5px', /* Küçültüldü */
          borderBottom: '1.5px solid #fff',
          borderLeft: '1.5px solid #fff'
        }} />
        
        {/* Bottom-right bracket */}
        <div style={{
          position: 'absolute',
          bottom: '0px',
          right: '0px',
          width: '5px', /* Küçültüldü */
          height: '5px', /* Küçültüldü */
          borderBottom: '1.5px solid #fff',
          borderRight: '1.5px solid #fff'
        }} />
      </div>
    </div>
  )
}
