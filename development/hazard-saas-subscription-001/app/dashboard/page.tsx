'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Overview } from '@/components/ui/dashboard/overview';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card-backup';
import { RecentHazards } from '@/components/ui/dashboard/recentHazards';
import { createClient } from '@/utils/supabase/client';
import { MdReportProblem, MdAssessment } from 'react-icons/md'; 
import { FaBook, FaBuilding } from 'react-icons/fa'; 

const Dashboard = () => {
  const [hazardsCount, setHazardsCount] = useState(0);
  const [incidentsCount, setIncidentsCount] = useState(0);
  const [safetyMeasuresCount, setSafetyMeasuresCount] = useState(0);
  const [businessUnitsCount, setBusinessUnitsCount] = useState(0);
  
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
        const { data: HazardType, error: hazardsError } = await supabase
          .from('Hazard')
          .select('HazardType');
        if (hazardsError) console.error(hazardsError);
    

        if (HazardType) {
          setHazardsCount(HazardType.length);
        } else {
          setHazardsCount(0); 
        }
    };

    fetchData();
  }, [supabase]);

  return (
    <div className="container mx-auto pt-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/hazards" passHref>
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hazards</CardTitle>
              <MdReportProblem className="text-2xl text-yellow-600" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Total Hazards</p>
              <div className="text-2xl font-bold">{hazardsCount}</div>
              <p className="text-xs text-muted-foreground">3 hazards added on February</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/business-units" passHref>
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Business Units</CardTitle>
              <FaBuilding className="text-2xl text-green-600" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Business Units</p>
              <div className="text-2xl font-bold">{businessUnitsCount}</div>
              <p className="text-xs text-muted-foreground">2 reported incidents</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/incidents" passHref>
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Incidents</CardTitle>
              <MdAssessment className="text-2xl text-red-600" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Total Incidents</p>
              <div className="text-2xl font-bold">{incidentsCount}</div>
              <p className="text-xs text-muted-foreground">4 incidents reported last month</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/safety-measures" passHref>
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Safety Measures</CardTitle>
              <FaBook className="text-2xl text-blue-600" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Safety Measures</p>
              <div className="text-2xl font-bold">{safetyMeasuresCount}</div>
              <p className="text-xs text-muted-foreground">Content for testing</p>
            </CardContent>
          </Card>
        </Link>
      
      </div>
      <div className="mt-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Overview />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">AI-Powered Predictions</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Based on the current trend and historical data, our AI model predicts:
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li className="text-sm text-gray-700">A 15% increase in slip and fall incidents during the upcoming rainy season.</li>
                  <li className="text-sm text-gray-700">Potential ergonomic issues in the new assembly line setup.</li>
                  <li className="text-sm text-gray-700">Chemical storage area B may need additional ventilation to prevent future incidents.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>You have 5 reports for this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentHazards />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
