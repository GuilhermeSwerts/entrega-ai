import { useLogin } from './hook/useLogin';
import loginBg from '../../assets/login-bg.png';
import { Mail, Lock, LogIn, Bike, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        loading,
        handleLogin,
        scrolled
    } = useLogin();

    return (
        <div className="min-h-screen bg-[#0f172a] w-full flex items-center justify-center p-4 md:p-6 lg:p-8">
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <Bike className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white italic" style={{ fontFamily: 'Outfit, sans-serif' }}>ENTREGA<span className="text-orange-500">.AI</span></span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-white hover:text-orange-500 transition-colors">Voltar</Link>
                        <Link to="/register" className="text-white hover:text-orange-500 transition-colors">Cadastrar</Link>
                    </div>
                </div>
            </nav>

            <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
                {/* Left Side: Image Content */}
                <div className="hidden md:flex md:w-1/2 relative overflow-hidden group">
                    <img
                        src={loginBg}
                        alt="Restaurant Interior"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-12">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="p-3 bg-primary rounded-2xl shadow-lg">
                                <Bike className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-4xl font-black text-white tracking-tight font-outfit uppercase">
                                Entrega<span className="text-primary">.AI</span>
                            </h1>
                        </div>
                        <p className="text-white/90 text-xl font-light max-w-md leading-relaxed">
                            Gerencie seu restaurante com a inteligência do futuro.
                            Praticidade, velocidade e sabor em um só lugar.
                        </p>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
                    <div className="md:hidden mb-8 flex items-center gap-2">
                        <div className="p-2 bg-primary rounded-xl">
                            <Bike className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight font-outfit uppercase">
                            Entrega<span className="text-primary">AI</span>
                        </h1>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Bem-vindo de volta!</h2>
                        <p className="text-slate-500">Acesse sua conta para gerenciar seus pedidos.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-slate-400" />
                                E-mail corporativo
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="exemplo@restaurante.com"
                                className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder:text-slate-400"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-slate-400" />
                                    Senha de acesso
                                </label>
                                <a href="#" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                                    Esqueceu a senha?
                                </a>
                            </div>
                            <div className="relative group/input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder:text-slate-400 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Entrar no Sistema
                                    <LogIn className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-sm text-slate-500">
                            Não tem uma conta?{' '}
                            <Link to="/register" className="font-bold text-primary hover:underline">
                                Cadastre-se clicando aqui
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
