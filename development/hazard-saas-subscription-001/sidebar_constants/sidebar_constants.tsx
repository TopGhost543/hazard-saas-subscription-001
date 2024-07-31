'use client';

import {BsEnvelope, BsGear, BsHouseDoor, BsKanban, BsListUl, BsQuestionCircle} from "react-icons/bs";
import {MdLogout, MdSettings, MdReportProblem, MdAssessment, MdFolderCopy} from "react-icons/md";
import { FaUsers, FaBook } from 'react-icons/fa';
import { SideNavItem, sideNavItemGroup } from "@/types/types";
import { signOutUser } from '@/utils/auth-helpers/server';
import router from "next/router";


export const SIDENAV_ITEMS: sideNavItemGroup[]=[
{
    title: "Dashboards",
    menuList: [ {
        title:"Dashboard",
        path:"/dashboard",
        icon:<BsHouseDoor size={20}/>,
    },
    {
        title:"Reports",
        path:"/Reports",
        icon:<MdFolderCopy size={20}/>,}
    ]
},

  
   {
    title: "Manage",
    menuList: [ {
        title:"Hazards",
        path:"/hazards",
        icon:<MdReportProblem size={20}/>,
        submenu: true,
        subMenuItems:[
            {title: 'View Hazards', path:'/hazards'},
            {title: 'Hazard Categories', path:'/hazards/Hazard_Categories'},
        ]
    },
    {
        title:"Incident Management",
        path:"/Incident_Management",
        icon:<MdAssessment size={20}/>,
    },
    {
        title:"Safety Measures",
        path:"/safetyMeasures",
        icon:<FaBook size={20}/>,
        submenu: true,
        subMenuItems:[
            {title: 'Safety Guidelines', path:'/SafetyMeasurePage'},
            {title: 'Emergency Procedures', path:'/Emergency_Procedures'},
        ]
    
    },]
   },
   {
    title: "others",
    menuList: [ {
        title:"Settings",
        path:"/Settings",
        icon:<MdSettings size={20}/>,
        submenu: true,
        subMenuItems:[
            {title: 'General Settings', path:'/General_Settings'},
            {title: 'Account Settings', path:'/Account_Settings'},
        ]
    },
    {
        title:"Help & Support",
        path:"/Help & Support",
        icon:<BsQuestionCircle size={20}/>,
        submenu: true,
        subMenuItems:[
            {title: 'FAQs', path:'/FAQs'},
            {title: 'Contact Support', path:'/Contact_Support'},
        ]
    },
    {
        title: "Logout",
        path: "/logout",
        icon: <MdLogout />,
        onClick: async () => { 
            await signOutUser();
            window.location.href = '/';
        },
    },]
   }
]

