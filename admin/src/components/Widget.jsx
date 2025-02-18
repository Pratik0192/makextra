import { Link } from "react-router-dom";
import React from 'react';

const Widget = ({ title, value, icon: Icon, bgColor, link }) => {
  return (
    <div className={`bg-gradient-to-br ${bgColor} p-6 rounded-md text-white shadow-xl flex flex-col justify-between`}>
      {/* Info div takes full width */}
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-2xl">{value}</p>
        </div>
        <Icon className="w-12 h-12" />
      </div>
      
      {link && (
        <Link to={link} className='mt-4 text-sm text-white underline hover:text-gray-200'>
          View all
        </Link>
      )}
    </div>
  );
}

export default Widget;
