import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    type ScriptableContext,
    type TooltipItem
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './styles.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export interface PropsGrafico {
    titulo: string;
    ganancias: number[];
    meses: string[];
    tituloX: string;
    tituloY: string;
}

const Grafico = (props: PropsGrafico) => {
    const data = {
        labels: props.meses,
        datasets: [
            {
                fill: true,
                label: 'Ingresos Mensuales',
                data: props.ganancias,
                borderColor: '#00aeef',
                borderWidth: 3,
                pointBackgroundColor: '#00aeef',
                pointBorderColor: '#fff',
                pointHoverRadius: 6,
                pointRadius: 4,
                tension: 0.4,
                backgroundColor: (context: ScriptableContext<'line'>) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(0, 174, 239, 0.4)');
                    gradient.addColorStop(1, 'rgba(0, 174, 239, 0)');
                    return gradient;
                },
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(13, 17, 23, 0.9)',
                titleFont: { family: 'Fira Code', size: 14 },
                bodyFont: { family: 'Fira Code', size: 13 },
                borderColor: 'rgba(0, 174, 239, 0.3)',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                    label: (context: TooltipItem<'line'>) => `S/. ${context.parsed.y.toLocaleString()}`
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                },
                ticks: {
                    color: '#A0A0A0',
                    font: { family: 'Fira Code', size: 11 },
                    callback: (value: string | number) => `S/. ${value}`
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#A0A0A0',
                    font: { family: 'Fira Code', size: 11 },
                },
            },
        },
    };

    return (
        <div className={styles.Grafico}>
            <Line data={data} options={options} />
        </div>
    );
};

export default Grafico;