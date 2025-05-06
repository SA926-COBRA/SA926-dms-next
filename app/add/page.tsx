'use client';

import React, { useEffect, useState } from 'react';
import { Command } from '@tauri-apps/api/shell';

const Addition = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const command = Command.sidecar('bin/server');
                await command.execute();


                const response = await fetch('http://localhost:3000/add');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return <div>{data.data}</div>;
};

export default Addition;
