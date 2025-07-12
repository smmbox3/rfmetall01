import React from 'react';
import { Star, CheckCircle, DollarSign, Truck, Shield, Clock } from 'lucide-react';
import { useCallModal } from '../contexts/CallModalContext';

const Hero: React.FC = () => {
  const { openModal } = useCallModal();

  const handleOrderClick = () => {
    openModal('Заказ звонка!');
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 text-white overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-40 h-40 bg-orange-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-xl mr-4">
              <span className="text-2xl font-bold">А</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">АТЛАНТ МЕТАЛЛ</h1>
              <p className="text-blue-200 text-sm">Металлопрокат из России</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-yellow-400 text-sm font-semibold">4.9</span>
                <span className="text-blue-200 text-sm ml-1">(112+ отзывов)</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-orange-300 font-medium transition-colors">
              Продукция
            </a>
            <a href="#calculator" className="text-white hover:text-orange-300 font-medium transition-colors">
              Калькулятор
            </a>
            <a href="#" className="text-white hover:text-orange-300 font-medium transition-colors">
              Как работаем
            </a>
            <a href="#contact" className="text-white hover:text-orange-300 font-medium transition-colors">
              Контакты
            </a>
          </nav>

          {/* Contact Info & CTA */}
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-xl font-bold text-white">
                +7 (747) 219 9369
              </div>
              <div className="text-sm text-blue-200">
                Звонок бесплатный
              </div>
            </div>
            
            <button
              onClick={handleOrderClick}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Заказать звонок
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-6 py-3 mb-12">
            <span className="text-orange-300 font-semibold text-lg">⭐ Эксклюзивные поставки редкого металлопроката из России</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="text-white">
              НУЖЕН РЕДКИЙ
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
              МЕТАЛЛОПРОКАТ?
            </span>
          </h1>

          {/* Description */}
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-2xl text-blue-100 mb-4">
              <span className="font-bold">ТОО "АТЛАНТ МЕТАЛЛ"</span> — ваш надежный партнер в поставках
            </p>
            <p className="text-2xl">
              <span className="text-orange-300 font-bold">эксклюзивного металлопроката из России</span>
            </p>
          </div>

          {/* Features Grid */}
          <div className="bg-gradient-to-r from-blue-800/50 to-purple-800/50 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-8 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-400 mr-3" />
                  <span className="text-xl font-bold text-white">Привозим то, чего НЕТ в Казахстане</span>
                </div>
                <p className="text-blue-200">
                  Редкие марки стали, нестандартные размеры, специальные сплавы
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-orange-400 mr-3" />
                  <span className="text-xl font-bold text-white">Доставка за 7-10 дней</span>
                </div>
                <p className="text-blue-200">
                  Прямые поставки с 15+ ведущих заводов России
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-green-400 mr-3" />
                  <span className="text-xl font-bold text-white">Экономия до 50%</span>
                </div>
                <p className="text-blue-200">
                  Без посредников, прямые заводские цены
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-400 mr-3" />
                  <span className="text-xl font-bold text-white">100% гарантия качества</span>
                </div>
                <p className="text-blue-200">
                  Полный пакет документов, сертификаты ГОСТ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;