import { useEffect, useState } from "react";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import OrderSolicitation from "../pages/orderSolicitation/OrderSolicitation";
import { api } from "../services/api";
import type { IRoutes } from "../interface/IRoutes";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Wallet from "../pages/wallet/Wallet";
import Layout from "../components/layout/Layout";
import { useRoutes } from "../context/RoutesContext";
import { BarChart2, BarChart3, HelpCircle, PackageCheck, PackagePlus, UserCog, Wallet as WalletIcon } from "lucide-react";
import Profile from "../pages/profile/Profile";
import { useUserData } from "../context/UserDataContext";

export const routesMap = [
    { path: "/", component: Home },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
    { path: "/order-solicitation", component: OrderSolicitation }
]

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 bg-white w-full">
            <div className="text-center">
                <div className="inline-flex rounded-full bg-yellow-100 p-4">
                    <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
                        <svg
                            className="w-16 h-16"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </div>
                </div>
                <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
                    404 - Pagina não encontrada
                </h1>
                <div className="flex items-center justify-center">
                    <button onClick={() => navigate(-1)} className='cursor-pointer w-full bg-red-300 mt-4 p-2 rounded-lg text-white hover:bg-red-500'>VOLTAR</button>
                </div>
                <p className="text-slate-600 mt-5 lg:text-lg">
                    A página que você está procurando não existe.
                </p>
            </div>
        </div>
    )
}

const LoadingSpinner: React.FC = () => {
    const [timeoutReached, setTimeoutReached] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeoutReached(true);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    if (timeoutReached) {
        return <NotFound />;
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
        </div>
    );
};

export const RoutesIcon = {
    Wallet: WalletIcon,
    BarChart3,
    BarChart2,
    PackagePlus,
    PackageCheck,
    UserCog,
    HelpCircle
}

const RoutesComponent = {
    Home,
    Register,
    Login,
    'Dashboard': Wallet,
    Wallet,
    OrderSolicitation,
    Profile
}

type ComponentKeys = keyof typeof RoutesComponent; // 'Home' | 'Register' | 'Login'

export const RouterMap = () => {
    // const navigate = useNavigate()
    const location = useLocation();
    const { userData } = useUserData();
    const { routesMap, setRoutesMap } = useRoutes()

    useEffect(() => {
        if (userData)
            api.get<IRoutes[]>("Customer/Routes", response => {
                setRoutesMap(response)
            }, true);
    }, [userData, location.pathname]);

    const getComponent = (route: IRoutes) => {
        const key = route.component as ComponentKeys
        const Component = RoutesComponent[key];
        const Icon = route.icon ? RoutesIcon[(route.icon as keyof typeof RoutesIcon)] : null;

        if (!Component) {
            return <Layout
                title={route.route}
                Icon={Icon ? <Icon className="text-gray-800" /> : null}
                subTitle={route.subTitle}
                key={route.path}
            >
                <NotFound />
            </Layout>;
        }

        return <Layout
            title={route.route}
            Icon={Icon ? <Icon /> : null}
            subTitle={route.subTitle}
            key={route.path}
        >
            <Component />
        </Layout>;
    };

    return (
        <Routes>
            {routesMap.filter(x => x.component !== undefined && x.component !== null).map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={getComponent(route)}
                />
            ))}

            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/teste' element={<OrderSolicitation />} />
            <Route path='*' element={<LoadingSpinner />} />
        </Routes>
    );
};
