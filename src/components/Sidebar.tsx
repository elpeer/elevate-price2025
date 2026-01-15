import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-[17%] ml-5 max-md:w-full max-md:ml-0">
      <div className="bg-background flex grow flex-col items-stretch w-full pt-[31px] pb-[4648px] px-3 max-md:pb-[100px]">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/ea9555237159d3cef60bb58ff4f3ebad99011a6e?placeholderIfAbsent=true"
          alt="Company Logo"
          className="aspect-[3.85] object-contain w-[196px] max-w-full mr-[22px] max-md:mr-2.5"
        />
        
        <nav className="w-full mt-[46px] max-md:mt-10">
          <div className="bg-muted flex min-h-[50px] w-full gap-2 rounded-[100px]" />
          <div className="flex min-h-[50px] w-full gap-2 rounded-[100px]" />
          <div className="flex min-h-[50px] w-full gap-2 rounded-[100px]" />
          <div className="flex min-h-[50px] w-full gap-2 rounded-[100px]" />
          <div className="flex min-h-[50px] w-full gap-2 rounded-[100px]" />
          <div className="flex min-h-[50px] w-full gap-2 rounded-[100px]" />
          <div className="flex min-h-[50px] w-full gap-2 rounded-[100px]" />
          <div className="flex min-h-[50px] w-full gap-2 rounded-[100px]" />
          <div className="flex min-h-[50px] w-full gap-2 rounded-[100px]" />
          <div className="flex min-h-[50px] w-full gap-2 rounded-[100px]" />
          <div className="flex min-h-[50px] w-full gap-2 rounded-[100px]" />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
