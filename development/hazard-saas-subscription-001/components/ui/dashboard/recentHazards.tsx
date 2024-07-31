'use client'

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { createClient } from '@/utils/supabase/client'; 
import { Tables } from '@/types_db';

type Hazard = Tables<'Hazard'>;

export function RecentHazards() {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [data, setData] = useState<Hazard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      let query = supabase.from('Hazard').select('*');

      if (selectedStatus !== 'All') {
        query = query.eq('Status', selectedStatus);
      }

      const { data: hazards, error } = await query;
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(hazards);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedStatus]);

  const filteredData = data;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
    setCurrentPage(1);
  };

  const handleRowClick = (hazard: Hazard) => {
    console.log('Row clicked:', hazard);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2 text-sm font-medium text-gray-700">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={selectedStatus}
          onChange={handleStatusChange}
          className="p-2 border rounded text-gray-700 text-sm"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Escalated">Escalated</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div className="flex-grow space-y-8">
        {currentItems.map((hazard, index) => (
          <div
            key={index}
            className="flex items-center flex-wrap md:flex-nowrap p-4 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-shadow duration-300"
            onClick={() => handleRowClick(hazard)}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/default.png" alt="Avatar" />
            </Avatar>
            <div className="ml-4 space-y-1 flex-1 min-w-0">
              <p className="text-sm font-medium leading-none">{hazard.Description}</p>
              <p className="text-sm text-muted-foreground truncate">{hazard.Location}</p>
              <p className={`text-sm ${hazard.Status === 'Pending' ? 'text-blue-500' : hazard.Status === 'In Progress' ? 'text-blue-500' : hazard.Status === 'New' ? 'text-orange-500' : hazard.Status === 'Resolved' ? 'text-green-500' : hazard.Status === 'Escalated' ? 'text-red-500' : 'text-gray-500'}`}>{hazard.Status}</p>
            </div>
            <div className="ml-auto font-medium text-right mt-2 md:mt-0">{hazard.EventType}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="p-2 text-gray-700 rounded disabled:opacity-50"
        >
          <AiOutlineLeft size={20} />
        </button>
        <span className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-700 rounded disabled:opacity-50"
        >
          <AiOutlineRight size={20} />
        </button>
      </div>
    </div>
  );
}
