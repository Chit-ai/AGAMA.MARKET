import { useState, useEffect } from 'react';
import { HeroSection } from '../components/market/HeroSection';
import { UniversalContractGrid } from '../components/market/UniversalContractGrid';
import { FeaturedAgents } from '../components/market/FeaturedAgents';
import type { Agent } from '../types/agent';

export function Marketplace() {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch agents from API
        fetch('http://localhost:8000/api/v1/agents/')
            .then(res => res.json())
            .then(data => {
                setAgents(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch agents:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen">
            <HeroSection />
            <UniversalContractGrid />
            <FeaturedAgents agents={agents} loading={loading} />
        </div>
    );
}
