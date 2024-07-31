'use client'

import Sidebar from '@/components/ui/dashboard/sidebar';
import Header from '@/components/ui/dashboard/header';
import PageWrapper from '@/components/ui/dashboard/pageWrapper';
import { ReactNode, useState } from 'react';
import ChatPage from '@/components/chatpage/chat';


interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({children}: {children: ReactNode}) => {
    const [toggleCollapse, setToggleCollapse] = useState(false);
    return (
                 <>
                 <div className='flex min-h-screen'>
                 <Sidebar toggleCollapse={toggleCollapse}></Sidebar>
                 <Header toggleCollapse={toggleCollapse} setToggleCollapse={setToggleCollapse}></Header>
                 <PageWrapper toggleCollapse={toggleCollapse}>
                    {children}
                </PageWrapper>
                <ChatPage></ChatPage>
                </div>
                </>
    );
}

export default DashboardLayout;
