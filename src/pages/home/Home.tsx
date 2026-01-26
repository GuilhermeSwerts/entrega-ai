import React, { useState, useEffect } from 'react';
import {
  Bike,
  Store,
  Users,
  TrendingUp,
  ShieldCheck,
  Clock,
  MapPin,
  ChevronRight,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const stats = [
    { label: 'Entregas Mensais', value: '50k+', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Entregadores Ativos', value: '1.2k+', icon: <Bike className="text-white w-5 h-5" /> },
    { label: 'Restaurantes Parceiros', value: '350+', icon: <Store className="w-5 h-5" /> },
    { label: 'Cidades Atendidas', value: '12', icon: <MapPin className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-orange-500/30 font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Bike className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white italic" style={{ fontFamily: 'Outfit, sans-serif' }}>ENTREGA<span className="text-orange-500">.AI</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#restaurantes" className="hover:text-orange-500 transition-colors">Para Restaurantes</a>
            <a href="#entregadores" className="hover:text-orange-500 transition-colors">Para Entregadores</a>
            <a href="#como-funciona" className="hover:text-orange-500 transition-colors">Como Funciona</a>
            <button className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25">
              Começar Agora/Entrar
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0f172a] border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-10 duration-200">
            <a href="#restaurantes" className="text-lg py-2 border-b border-white/5" onClick={() => setIsMenuOpen(false)}>Para Restaurantes</a>
            <a href="#entregadores" className="text-lg py-2 border-b border-white/5" onClick={() => setIsMenuOpen(false)}>Para Entregadores</a>
            <a href="#como-funciona" className="text-lg py-2 border-b border-white/5" onClick={() => setIsMenuOpen(false)}>Como Funciona</a>
            <button className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl mt-4">Começar Agora</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full -z-10" />

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              A Revolução na Logística Urbana
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              A Cooperativa de <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">Entregas</span> que seu negócio precisa.
            </h1>
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed font-light">
              Terceirize suas entregas com a Entrega.AI. Conectamos seu restaurante a uma cooperativa de motoboys profissional, ágil e segura. O "Uber" das entregas para o seu estabelecimento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all hover:translate-y-[-2px] shadow-xl shadow-orange-500/25 group">
                Sou Restaurante
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all">
                Quero ser Entregador
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/20 to-amber-400/20 rounded-[2.5rem] blur-2xl group-hover:opacity-75 transition-opacity duration-500" />
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-800/50">
              <img
                src="/assets/hero.png"
                alt="Motoboy Entrega AI"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-orange-400 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Entrega Média: 12 min
                  </span>
                  <span className="text-white">Mais de 500 motoboys online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-slate-900/40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-xl bg-white/5 text-orange-500 mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Restaurants */}
      <section id="restaurantes" className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute -inset-4 bg-orange-500/30 rounded-3xl blur-[60px] opacity-20" />
              <img
                src="/assets/restaurant.png"
                alt="Gestão para Restaurantes"
                className="relative rounded-3xl border border-white/10 shadow-2xl w-full h-auto"
              />
            </div>

            <div className="order-1 md:order-2 space-y-8">
              <h2 className="text-4xl font-bold text-white leading-tight tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Potencialize seu delivery sem contratar <span className="text-orange-500">frota própria.</span>
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Custos Variáveis', desc: 'Pague apenas pelo que usar. Sem encargos fixos com motoboys.', icon: <TrendingUp className="text-orange-500" /> },
                  { title: 'Gestão Simplificada', desc: 'Painel intuitivo para solicitar e acompanhar entregas em tempo real.', icon: <Store className="text-orange-500" /> },
                  { title: 'Segurança e Garantia', desc: 'Entrega garantida pela nossa cooperativa com seguro contra danos.', icon: <ShieldCheck className="text-orange-500" /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5 group">
                    <div className="mt-1 p-2 rounded-lg bg-white/5 group-hover:bg-orange-500/10 transition-colors">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-white text-lg tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.title}</h3>
                      <p className="text-slate-400 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Motoboys (Cooperative Section) */}
      <section id="entregadores" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[100px] rounded-full" />

        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[3rem] p-8 md:p-16 border border-white/10 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                  Cooperativa Tecnológica
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Muito mais que um app, uma <span className="text-orange-500">cooperativa.</span>
                </h2>
                <p className="text-lg text-slate-400 font-light max-w-md">
                  Na Entrega.AI, os motoboys são parceiros. Oferecemos as melhores taxas do mercado, suporte real e uma comunidade forte.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/20 transition-colors">
                    <div className="text-orange-500 font-bold text-2xl mb-1 tracking-tighter" style={{ fontFamily: 'Outfit, sans-serif' }}>90%</div>
                    <div className="text-sm text-slate-400 leading-tight">Valor da entrega repassado integralmente ao motoboy.</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/20 transition-colors">
                    <div className="text-orange-500 font-bold text-2xl mb-1 tracking-tighter" style={{ fontFamily: 'Outfit, sans-serif' }}>24h</div>
                    <div className="text-sm text-slate-400 leading-tight">Suporte humanizado e benefícios cooperativos.</div>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-8 py-5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95">
                  Quero ser um Cooperado
                </button>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-orange-500/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
                <img
                  src="/assets/cooperative.png"
                  alt="Nossa Comunidade"
                  className="relative rounded-2xl shadow-2xl transform transition-all duration-700 group-hover:rotate-2 w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Tão simples quanto <span className="text-orange-500">pedir um Uber.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-16 md:gap-8">
            {[
              { step: '01', title: 'Integração', desc: 'Cadastre seu restaurante e integre nosso sistema em minutos.' },
              { step: '02', title: 'Solicitação', desc: 'Aperte um botão e o motoboy cooperado mais próximo assume a entrega.' },
              { step: '03', title: 'Sucesso', desc: 'Acompanhe em tempo real até o lanche chegar na mão do seu cliente.' },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="text-9xl font-black text-white/[0.03] absolute -top-16 left-1/2 -translate-x-1/2 group-hover:text-orange-500/[0.05] transition-colors leading-none">
                  {item.step}
                </div>
                <div className="relative space-y-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto text-orange-500 font-bold group-hover:bg-orange-500 group-hover:text-white transition-all">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.title}</h3>
                  <p className="text-slate-400 font-light max-w-xs mx-auto leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-orange-500/40 group">
            <div className="absolute top-0 right-0 p-40 bg-white/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/30 transition-all duration-1000" />

            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Otimize sua logística <br className="hidden md:block" /> com quem entende de entrega.
              </h2>
              <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto">
                Milhares de restaurantes já reduziram custos em até 40% usando a Entrega.AI.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                <button className="px-12 py-5 bg-white text-orange-600 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl uppercase tracking-wider text-sm">
                  Começar agora gratuitamente
                </button>
                <button className="px-12 py-5 bg-transparent border-2 border-white/50 rounded-2xl font-bold hover:bg-white/10 transition-colors uppercase tracking-wider text-sm">
                  Falar com especialista
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#0a0f1d]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Bike className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-white italic tracking-tighter" style={{ fontFamily: 'Outfit, sans-serif' }}>ENTREGA<span className="text-orange-500">.AI</span></span>
              </div>
              <p className="text-slate-400 max-w-xs leading-relaxed font-light">
                A primeira cooperativa tecnológica de entregas do Brasil. Unindo agilidade para restaurantes e justiça para entregadores.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>Plataforma</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Sou Restaurante</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Quero ser Entregador</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Taxas e Preços</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Segurança</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>Empresa</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contatos</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Carreiras</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
            <div className="text-slate-600 text-sm">
              © 2026 Entrega.AI Soluções Logísticas LTDA. CNPJ: 12.345.678/0001-90
            </div>
            <div className="flex gap-8 text-slate-500 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Português (BR)</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;