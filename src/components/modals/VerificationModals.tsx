import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { 
  Shield,
  GraduationCap,
  Phone,
  Upload,
  CheckCircle,
  AlertTriangle,
  Info,
  Eye,
  EyeOff,
  Clock,
  Mail,
  FileText,
  Camera,
  Sparkles
} from 'lucide-react';

interface VerificationModalsProps {
  isIdModalOpen: boolean;
  isStudentModalOpen: boolean;
  isPhoneModalOpen: boolean;
  onCloseIdModal: () => void;
  onCloseStudentModal: () => void;
  onClosePhoneModal: () => void;
  onVerificationComplete: (type: 'id' | 'student' | 'phone') => void;
}

export const VerificationModals: React.FC<VerificationModalsProps> = ({
  isIdModalOpen,
  isStudentModalOpen,
  isPhoneModalOpen,
  onCloseIdModal,
  onCloseStudentModal,
  onClosePhoneModal,
  onVerificationComplete
}) => {
  // ID Verification State
  const [idStep, setIdStep] = useState(1);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idProgress, setIdProgress] = useState(0);
  const [idComplete, setIdComplete] = useState(false);

  // Student Verification State
  const [studentStep, setStudentStep] = useState(1);
  const [studentEmail, setStudentEmail] = useState('');
  const [studentProgress, setStudentProgress] = useState(0);
  const [studentComplete, setStudentComplete] = useState(false);

  // Phone Verification State
  const [phoneStep, setPhoneStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [phoneProgress, setPhoneProgress] = useState(0);
  const [phoneComplete, setPhoneComplete] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  // Progress simulation
  useEffect(() => {
    if (idProgress > 0 && idProgress < 100) {
      const timer = setTimeout(() => {
        setIdProgress(prev => Math.min(prev + 10, 100));
      }, 200);
      return () => clearTimeout(timer);
    }
    if (idProgress === 100 && !idComplete) {
      setTimeout(() => setIdComplete(true), 500);
    }
  }, [idProgress, idComplete]);

  useEffect(() => {
    if (studentProgress > 0 && studentProgress < 100) {
      const timer = setTimeout(() => {
        setStudentProgress(prev => Math.min(prev + 15, 100));
      }, 300);
      return () => clearTimeout(timer);
    }
    if (studentProgress === 100 && !studentComplete) {
      setTimeout(() => setStudentComplete(true), 500);
    }
  }, [studentProgress, studentComplete]);

  useEffect(() => {
    if (phoneProgress > 0 && phoneProgress < 100) {
      const timer = setTimeout(() => {
        setPhoneProgress(prev => Math.min(prev + 20, 100));
      }, 250);
      return () => clearTimeout(timer);
    }
    if (phoneProgress === 100 && !phoneComplete) {
      setTimeout(() => setPhoneComplete(true), 500);
    }
  }, [phoneProgress, phoneComplete]);

  // OTP Timer
  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  const handleIdFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setIdFile(event.target.files[0]);
      setIdStep(2);
    }
  };

  const handleIdSubmit = () => {
    setIdProgress(10);
    setIdStep(3);
  };

  const handleStudentEmailSubmit = () => {
    if (studentEmail.includes('@') && studentEmail.includes('.edu')) {
      setStudentProgress(10);
      setStudentStep(2);
    }
  };

  const handlePhoneSubmit = () => {
    if (phoneNumber.length >= 10) {
      setPhoneStep(2);
      setOtpTimer(60);
    }
  };

  const handleOtpSubmit = () => {
    if (otpCode.length === 6) {
      setPhoneProgress(10);
      setPhoneStep(3);
    }
  };

  const resetIdModal = () => {
    setIdStep(1);
    setIdFile(null);
    setIdProgress(0);
    setIdComplete(false);
  };

  const resetStudentModal = () => {
    setStudentStep(1);
    setStudentEmail('');
    setStudentProgress(0);
    setStudentComplete(false);
  };

  const resetPhoneModal = () => {
    setPhoneStep(1);
    setPhoneNumber('');
    setOtpCode('');
    setPhoneProgress(0);
    setPhoneComplete(false);
    setOtpTimer(0);
  };

  return (
    <>
      {/* ID Verification Modal */}
      <Modal
        isOpen={isIdModalOpen}
        onClose={() => {
          onCloseIdModal();
          resetIdModal();
        }}
        title="Kimlik Doğrulama"
        size="md"
      >
        <div className="space-y-6">
          {!idComplete ? (
            <>
              {/* KVKK Privacy Notice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      🔒 Gizlilik ve KVKK
                    </h3>
                    <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <p>• Kimlik bilgileriniz şifreli olarak saklanır</p>
                      <p>• Sadece doğrulama için kullanılır</p>
                      <p>• 3. taraflarla paylaşılmaz</p>
                      <p>• İstediğiniz zaman silebilirsiniz</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 1: File Upload */}
              {idStep === 1 && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Kimlik Belgenizi Yükleyin
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Nüfus cüzdanı veya ehliyet fotoğrafı çekin
                  </p>
                  
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIdFileUpload}
                      className="hidden"
                      id="id-upload"
                    />
                    <label htmlFor="id-upload">
                      <Button variant="outline" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Fotoğraf Seç
                      </Button>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 2: Confirm Upload */}
              {idStep === 2 && idFile && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Fotoğrafı Onaylayın
                  </h3>
                  <div className="mb-6">
                    <img
                      src={URL.createObjectURL(idFile)}
                      alt="Kimlik belgesi"
                      className="max-w-full h-48 object-contain mx-auto rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setIdStep(1)} className="flex-1">
                      Yeniden Çek
                    </Button>
                    <Button onClick={handleIdSubmit} className="flex-1">
                      Doğrulamaya Gönder
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Processing */}
              {idStep === 3 && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Kimlik Doğrulanıyor...
                  </h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${idProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    AI teknolojisi ile kimliğiniz doğrulanıyor...
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                {/* Success Sparkles */}
                {[...Array(8)].map((_, i) => (
                  <Sparkles
                    key={i}
                    className={`absolute h-4 w-4 text-yellow-400 animate-ping`}
                    style={{
                      top: `${20 + Math.cos(i * 45 * Math.PI / 180) * 40}px`,
                      left: `${50 + Math.sin(i * 45 * Math.PI / 180) * 40}%`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Kimlik Doğrulandı! ✨
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Artık doğrulanmış bir üyesiniz
              </p>
              <Button 
                onClick={() => {
                  onVerificationComplete('id');
                  onCloseIdModal();
                  resetIdModal();
                }}
                className="w-full"
              >
                Harika!
              </Button>
            </div>
          )}
        </div>
      </Modal>

      {/* Student Verification Modal */}
      <Modal
        isOpen={isStudentModalOpen}
        onClose={() => {
          onCloseStudentModal();
          resetStudentModal();
        }}
        title="Öğrenci Doğrulama"
        size="md"
      >
        <div className="space-y-6">
          {!studentComplete ? (
            <>
              {/* Privacy Note */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                      📚 Öğrenci Doğrulama
                    </h3>
                    <div className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                      <p>• Sadece .edu.tr uzantılı e-postalar kabul edilir</p>
                      <p>• Doğrulama e-postası gönderilecek</p>
                      <p>• E-posta adresiniz gizli tutulur</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 1: Email Input */}
              {studentStep === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Öğrenci E-posta Adresiniz
                  </h3>
                  <Input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="ornek@universite.edu.tr"
                    icon={<Mail className="h-4 w-4" />}
                    className="mb-4"
                  />
                  <Button 
                    onClick={handleStudentEmailSubmit}
                    disabled={!studentEmail.includes('@') || !studentEmail.includes('.edu')}
                    className="w-full"
                  >
                    Doğrulama E-postası Gönder
                  </Button>
                </div>
              )}

              {/* Step 2: Processing */}
              {studentStep === 2 && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    E-posta Doğrulanıyor...
                  </h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                    <div 
                      className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${studentProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {studentEmail} adresine doğrulama e-postası gönderildi
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      E-posta gelmedi mi? Spam klasörünü kontrol edin.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <GraduationCap className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                </div>
                {/* Success Animation */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-ping">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Öğrenci Doğrulandı! 🎓
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Öğrenci indirimleri ve özel fırsatlara erişiminiz açıldı
              </p>
              <Button 
                onClick={() => {
                  onVerificationComplete('student');
                  onCloseStudentModal();
                  resetStudentModal();
                }}
                className="w-full"
              >
                Harika!
              </Button>
            </div>
          )}
        </div>
      </Modal>

      {/* Phone Verification Modal */}
      <Modal
        isOpen={isPhoneModalOpen}
        onClose={() => {
          onClosePhoneModal();
          resetPhoneModal();
        }}
        title="Telefon Doğrulama"
        size="md"
      >
        <div className="space-y-6">
          {!phoneComplete ? (
            <>
              {/* Privacy Note */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">
                      📱 Telefon Doğrulama
                    </h3>
                    <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
                      <p>• SMS ile 6 haneli kod gönderilir</p>
                      <p>• Telefon numaranız gizli tutulur</p>
                      <p>• Sadece güvenlik için kullanılır</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 1: Phone Input */}
              {phoneStep === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Telefon Numaranız
                  </h3>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="0555 123 45 67"
                    icon={<Phone className="h-4 w-4" />}
                    className="mb-4"
                  />
                  <Button 
                    onClick={handlePhoneSubmit}
                    disabled={phoneNumber.length < 10}
                    className="w-full"
                  >
                    SMS Kodu Gönder
                  </Button>
                </div>
              )}

              {/* Step 2: OTP Input */}
              {phoneStep === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    SMS Kodunu Girin
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {phoneNumber} numarasına gönderilen 6 haneli kodu girin
                  </p>
                  
                  <div className="flex gap-2 mb-4">
                    {[...Array(6)].map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                        value={otpCode[i] || ''}
                        onChange={(e) => {
                          const newOtp = otpCode.split('');
                          newOtp[i] = e.target.value;
                          setOtpCode(newOtp.join(''));
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {otpTimer > 0 ? `${otpTimer} saniye` : 'Kod gelmedi mi?'}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={otpTimer > 0}
                      onClick={() => setOtpTimer(60)}
                    >
                      Yeniden Gönder
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleOtpSubmit}
                    disabled={otpCode.length !== 6}
                    className="w-full"
                  >
                    Kodu Doğrula
                  </Button>
                </div>
              )}

              {/* Step 3: Processing */}
              {phoneStep === 3 && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Telefon Doğrulanıyor...
                  </h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                    <div 
                      className="bg-green-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${phoneProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    SMS kodu doğrulanıyor...
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Phone className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <div className="absolute -top-2 -right-2 animate-bounce">
                  <Badge variant="success" size="sm">
                    Doğrulandı
                  </Badge>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Telefon Doğrulandı! 📱
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Artık güvenilir bir iletişim kanalınız var
              </p>
              <Button 
                onClick={() => {
                  onVerificationComplete('phone');
                  onClosePhoneModal();
                  resetPhoneModal();
                }}
                className="w-full"
              >
                Tamamlandı
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}; 