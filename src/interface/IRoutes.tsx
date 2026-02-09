export interface IRoutes {
    route: string;
    path: string;
    icon?: string;
    component: string;
    subTitle?: string;
    rule?: IRuleRoutes;
}

export interface IRuleRoutes {
    canAccess: boolean;
    message: string;
}