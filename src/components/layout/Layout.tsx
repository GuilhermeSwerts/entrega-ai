import React from 'react'
import { Sidebar } from '../Sidebar'
import { Header } from '../Header'

type LayoutProps = {
    children: React.ReactNode;
    title: string;
    subTitle?: string;
    Icon?: React.ReactNode;
}

const Layout = ({ children, title, Icon, subTitle }: LayoutProps) => {
    return (
        <div className="flex min-h-screen bg-[#F5F6FA] font-sans">
            <Sidebar />
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto space-y-6">
                    <Header
                        title={title}
                        Icon={Icon}
                        subTitle={subTitle}
                        key={title}
                    />
                    {children}
                </div>
            </main>

        </div>
    )
}

export default Layout