import React from 'react';

interface RoundedCornersProps {
    children: React.ReactNode;
}
const RoundedCorners: React.FC<RoundedCornersProps> = ({children}) => {
    return (
        <main>
            {/*<div className="relative ring-[1px] ring-foreground/20 ring-inset rounded-xl  bg-background z-0">*/}
            <div className="relative bg-background z-0">
                <div className="
                    relative flex before:absolute before:h-[300px] before:w-full sm:before:w-[480px]
                    before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent
                    before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px]
                    after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-['']
                    before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10
                    after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] bg-background
                  " />
                    {children}
            </div>
        </main>

    );
};

export default RoundedCorners;