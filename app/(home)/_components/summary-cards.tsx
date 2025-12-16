import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCards {
  month: string;
}

const SummaryCards = () => {
    return (  
        <div className="space-y-6">
            {/* PRIMEIRO CARD */}
            <SummaryCard
                icon={<WalletIcon size={16} />}
                title="Saldo"
                amount={3500}
                size="large"
            />
            
            {/* OUTROS CARDS */}
            <div className="grid grid-cols-3 gap-6">
                <SummaryCard 
                    icon={<PiggyBankIcon size={16} />}
                    title="Investido" 
                    amount={3500} 
                />
                <SummaryCard 
                    icon={<TrendingUpIcon size={16} className="text-primary" />}
                    title="Receita" 
                    amount={3500} 
                />
                <SummaryCard 
                    icon={<TrendingDownIcon size={16} className="text-red-500"/>}
                    title="Despesas" 
                    amount={3500} 
                />  
            </div>
        </div>
    );
}
 
export default SummaryCards;