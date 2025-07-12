import React, { useState, useEffect } from 'react';
import { X, Phone, User } from 'lucide-react';
import { useCallModal } from '../contexts/CallModalContext';
import { submitLead } from '../services/bitrixService';

interface FormData {
  name: string;
  phone: string;
}

const CallModal: React.FC = () => {
  const { isOpen, closeModal, formType } = useCallModal();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', phone: '' });
      setErrors({});
      setSubmitStatus('idle');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11 && cleaned.startsWith('8')) {
      return '+7' + cleaned.slice(1);
    } else if (cleaned.length === 10) {
      return '+7' + cleaned;
    } else if (cleaned.length === 11 && cleaned.startsWith('7')) {
      return '+' + cleaned;
    }
    return phone;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const leadData = {
        name: formData.name.trim(),
        phone: formatPhone(formData.phone.trim()),
        formType: formType,
        comment: '',
        source: 'Сайт АТЛАНТ МЕТАЛЛ',
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      };

      const result = await submitLead(leadData);
      
      if (result.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          closeModal();
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePhoneChange = (value: string) => {
    let formatted = value.replace(/\D/g, '');
    
    if (formatted.length > 0) {
      if (formatted.startsWith('8')) {
        formatted = '7' + formatted.slice(1);
      }
      if (!formatted.startsWith('7')) {
        formatted = '7' + formatted;
      }
      
      if (formatted.length > 11) {
        formatted = formatted.slice(0, 11);
      }
      
      if (formatted.length >= 1) {
        formatted = '+' + formatted;
      }
      if (formatted.length >= 5) {
        formatted = formatted.slice(0, 2) + ' (' + formatted.slice(2, 5) + ') ' + formatted.slice(5);
      }
      if (formatted.length >= 12) {
        formatted = formatted.slice(0, 10) + '-' + formatted.slice(10, 12) + '-' + formatted.slice(12);
      }
    }
    
    handleInputChange('phone', formatted);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl max-w-md w-full shadow-2xl transform transition-all border border-blue-400/30">
        {/* Header */}
        <div className="relative p-8 text-center">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <X className="h-6 w-6" />
          </button>
          
          <h2 className="text-3xl font-bold text-white mb-4">Заказ звонка!</h2>
          <p className="text-blue-100 text-lg">
            Заполните форму и наш менеджер свяжется с вами
            <br />
            в течение 15 минут!
          </p>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Phone className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Заявка отправлена! 🎉</h3>
              <p className="text-blue-100 mb-6">
                Наш менеджер свяжется с вами в течение <strong>15 минут</strong>
              </p>
              <div className="bg-blue-800/50 p-4 rounded-xl border border-blue-400/30">
                <p className="text-blue-100 font-medium">
                  📞 Ожидайте звонка на номер: <br />
                  <span className="text-lg font-bold text-white">{formData.phone}</span>
                </p>
              </div>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="text-center py-8">
              <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <X className="h-12 w-12 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Ошибка отправки</h3>
              <p className="text-blue-100 mb-6">
                Произошла ошибка при отправке заявки. Попробуйте еще раз или позвоните нам напрямую.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Попробовать снова
                </button>
                <a
                  href="tel:+77472199369"
                  className="block w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors text-center"
                >
                  📞 Позвонить: +7 (747) 219-93-69
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-6 py-4 bg-blue-800/50 border-2 rounded-xl text-white placeholder-blue-200 focus:ring-4 focus:ring-orange-500/50 transition-all text-lg ${
                    errors.name ? 'border-red-400 focus:border-red-400' : 'border-orange-400 focus:border-orange-300'
                  }`}
                  placeholder="Имя"
                />
                {errors.name && (
                  <p className="text-red-300 text-sm mt-2">{errors.name}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={`w-full px-6 py-4 bg-blue-800/50 border-2 rounded-xl text-white placeholder-blue-200 focus:ring-4 focus:ring-orange-500/50 transition-all text-lg ${
                    errors.phone ? 'border-red-400 focus:border-red-400' : 'border-orange-400 focus:border-orange-300'
                  }`}
                  placeholder="Телефон"
                />
                {errors.phone && (
                  <p className="text-red-300 text-sm mt-2">{errors.phone}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-xl font-bold text-xl transition-all disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Отправляем...
                  </span>
                ) : (
                  'Заказать звонок'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallModal;