'use client';

import React, { createContext, useContext } from 'react';
import { SiteContent } from '@/types';

const SiteContentContext = createContext<SiteContent | null>(null);

export function SiteContentProvider({ data, children }: { data: SiteContent, children: React.ReactNode }) {
    return (
        <SiteContentContext.Provider value={data}>
            {children}
        </SiteContentContext.Provider>
    );
}

export function useSiteContent() {
    const ctx = useContext(SiteContentContext);
    if (!ctx) {
        throw new Error("useSiteContent must be used within a SiteContentProvider");
    }
    return ctx;
}
