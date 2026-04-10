/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Clock, 
  Search, 
  Heart, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Truck, 
  Settings, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'motion/react';

const CATEGORIES = [
  { id: 1, name: 'Тракторы', image: 'https://picsum.photos/seed/tractor/400/400' },
  { id: 2, name: 'Комбайны', image: 'https://picsum.photos/seed/combine/400/400' },
  { id: 3, name: 'Посевное оборудование', image: 'https://picsum.photos/seed/seeder/400/400' },
  { id: 4, name: 'Почвообработка', image: 'https://picsum.photos/seed/plow/400/400' },
  { id: 5, name: 'Опрыскиватели', image: 'https://picsum.photos/seed/sprayer/400/400' },
  { id: 6, name: 'Запчасти', image: 'https://picsum.photos/seed/parts/400/400' },
];

const POPULAR_PRODUCTS = [
  {
    id: 1,
    name: 'John Deere 6175M',
    category: 'Тракторы',
    specs: ['Мощность: 175 л.с.', 'Двигатель: 6.8 л', 'Привод: 4x4'],
    image: 'https://picsum.photos/seed/jd6175/600/400',
    isHit: true,
  },
  {
    id: 2,
    name: 'Claas Lexion 8700',
    category: 'Комбайны',
    specs: ['Мощность: 571 л.с.', 'Бункер: 13500 л', 'Жатка: до 13.8 м'],
    image: 'https://picsum.photos/seed/claas/600/400',
    isHit: true,
  },
  {
    id: 3,
    name: 'Horsch Pronto 6 DC',
    category: 'Сеялки',
    specs: ['Ширина: 6 м', 'Скорость: до 20 км/ч', 'Объем: 4000 л'],
    image: 'https://picsum.photos/seed/horsch/600/400',
    isHit: false,
  },
  {
    id: 4,
    name: 'Lemken Diamant 16',
    category: 'Плуги',
    specs: ['Корпусов: 7-9', 'Ширина: до 5 м', 'Вес: 3500 кг'],
    image: 'https://picsum.photos/seed/lemken/600/400',
    isHit: true,
  },
];

const ADVANTAGES = [
  { icon: <Truck className="w-8 h-8" />, title: 'Быстрая доставка', desc: 'Доставляем технику в любую точку России собственным транспортом.' },
  { icon: <Settings className="w-8 h-8" />, title: 'Сервис 24/7', desc: 'Круглосуточная техническая поддержка и выездные бригады.' },
  { icon: <CheckCircle2 className="w-8 h-8" />, title: 'Гарантия качества', desc: 'Только оригинальное оборудование от ведущих мировых брендов.' },
  { icon: <MessageSquare className="w-8 h-8" />, title: 'Консультации', desc: 'Помогаем подобрать технику под ваши задачи и бюджет.' },
];

const CLIENTS = [
  'АгроСила', 'Мираторг', 'Черкизово', 'Русагро', 'ЭкоНива', 'Степь'
];

export default function App() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const saved = localStorage.getItem('wishlist');
    if (saved) setFavorites(JSON.parse(saved));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = (id: number) => {
    const newFavs = favorites.includes(id) 
      ? favorites.filter(f => f !== id) 
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('wishlist', JSON.stringify(newFavs));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      {/* Top Info Bar */}
      <div className="bg-[#1a5e1a] text-white py-2 px-4 text-xs sm:text-sm">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <a href="tel:+78001234567" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone size={14} /> +7 (800) 123-45-67
            </a>
            <a href="mailto:info@agro-tech.ru" className="hidden sm:flex items-center gap-1 hover:text-accent transition-colors">
              <Mail size={14} /> info@agro-tech.ru
            </a>
          </div>
          <div className="flex items-center gap-1 opacity-80">
            <Clock size={14} /> Пн-Пт: 9:00-18:00
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">А</div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none text-primary">АгроТех</span>
              <span className="text-[10px] uppercase tracking-widest opacity-60">Сельхозтехника</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {['Главная', 'Каталог', 'О нас', 'Доставка', 'Сервис', 'Отзывы', 'Контакты'].map((item) => (
              <a key={item} href="#" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">{item}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden xl:flex items-center relative group">
              <Input 
                placeholder="Поиск техники..." 
                className="w-48 focus:w-64 transition-all duration-300 bg-background border-none shadow-inner"
              />
              <Search className="absolute right-3 text-muted-foreground" size={16} />
            </div>
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 hover:text-primary">
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
            <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary hover:text-white">
              Заказать звонок
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  {['Главная', 'Каталог', 'О нас', 'Доставка', 'Сервис', 'Отзывы', 'Контакты'].map((item) => (
                    <a key={item} href="#" className="text-lg font-medium border-b pb-2">{item}</a>
                  ))}
                  <Button className="mt-4 bg-accent hover:bg-accent/90">Заказать звонок</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://picsum.photos/seed/farm/1920/1080" 
              alt="Farm background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-5xl sm:text-6xl font-bold mb-4 uppercase tracking-tight">СЕЛЬХОЗТЕХНИКА</h1>
              <p className="text-xl sm:text-2xl mb-8 opacity-90">Надежное оборудование для вашего урожая от мировых производителей</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">Каталог техники</Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary text-lg px-8">
                  Получить прайс-лист
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md py-6">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <CheckCircle2 className="text-accent" />, text: 'Более 15 лет на рынке' },
                { icon: <Settings className="text-accent" />, text: 'Собственный сервисный центр' },
                { icon: <Truck className="text-accent" />, text: 'Доставка по всей России' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white">
                  {item.icon}
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center uppercase tracking-wider">Категории техники</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((cat) => (
                <motion.div 
                  key={cat.id}
                  whileHover={{ scale: 1.02 }}
                  className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-md"
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-accent/60 transition-colors duration-300 flex flex-col justify-end p-6">
                    <div className="flex justify-between items-center text-white">
                      <h3 className="text-xl font-bold">{cat.name}</h3>
                      <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold uppercase tracking-wider">Популярная техника</h2>
                <div className="h-1 w-20 bg-accent mt-2"></div>
              </div>
              <Button variant="link" className="text-primary font-bold">Смотреть все <ChevronRight size={16} /></Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {POPULAR_PRODUCTS.map((product) => (
                <Card key={product.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {product.isHit && (
                      <Badge className="absolute top-3 left-3 bg-accent hover:bg-accent">ХИТ</Badge>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleFavorite(product.id)}
                      className={`absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full ${favorites.includes(product.id) ? 'text-red-500' : 'text-gray-400'}`}
                    >
                      <Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                    </Button>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="text-xs text-primary font-bold uppercase mb-1">{product.category}</div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <ul className="space-y-1">
                      {product.specs.map((spec, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full"></div>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90">Подробнее</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-16 text-center uppercase tracking-wider">Почему выбирают нас</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {ADVANTAGES.map((adv, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    {adv.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{adv.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Request Form */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-2">Нужна консультация?</h2>
                <p className="opacity-80">Оставьте заявку, и наш специалист свяжется с вами в течение 15 минут</p>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input placeholder="Ваше имя" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12" />
                <Input placeholder="Телефон" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12" />
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white h-12">
                    <SelectValue placeholder="Выберите технику" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tractors">Тракторы</SelectItem>
                    <SelectItem value="combines">Комбайны</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-accent hover:bg-accent/90 text-white font-bold h-12 uppercase">Отправить</Button>
              </form>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="py-16 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              {CLIENTS.map((client) => (
                <span key={client} className="text-2xl font-black tracking-tighter hover:text-primary cursor-default transition-colors">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">А</div>
                <span className="font-bold text-xl text-primary">АгроТех</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Поставка и обслуживание современной сельскохозяйственной техники от ведущих мировых производителей. 
                Надежность, проверенная временем.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholder */}
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="text-xs font-bold">VK</span>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="text-xs font-bold">TG</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-2">Каталог</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Тракторы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Комбайны</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Посевное оборудование</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Почвообработка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Запчасти</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-2">Компания</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка и оплата</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Сервис и гарантия</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Отзывы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-2">Контакты</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-primary shrink-0" />
                  <div>
                    <div className="text-white font-medium">+7 (800) 123-45-67</div>
                    <div className="text-xs opacity-60">Бесплатно по РФ</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-primary shrink-0" />
                  <div>
                    <div className="text-white font-medium">info@agro-tech.ru</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} className="text-primary shrink-0" />
                  <div>
                    <div className="text-white font-medium">Пн-Пт: 9:00 - 18:00</div>
                    <div className="text-xs opacity-60">Сб-Вс: Выходной</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <div>© 2026 АгроТех. Все права защищены.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Публичная оферта</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
