import styles from './styles.module.css'
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export interface PropsGrafico {
    titulo: string
    ganancias: number[]
    meses: string[]
    tituloX: string
    tituloY: string
}

const Grafico = (props: PropsGrafico) => {
    const data = {
        labels: props.meses,
        datasets: [
            {
            label: props.tituloX,
            data: props.ganancias,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(199, 199, 199, 0.6)',
                'rgba(83, 109, 254, 0.6)',
                'rgba(255, 99, 200, 0.6)',
                'rgba(0, 200, 100, 0.6)',
                'rgba(100, 100, 100, 0.6)',
                'rgba(200, 0, 0, 0.6)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(199, 199, 199, 1)',
                'rgba(83, 109, 254, 1)',
                'rgba(255, 99, 200, 1)',
                'rgba(0, 200, 100, 1)',
                'rgba(100, 100, 100, 1)',
                'rgba(200, 0, 0, 1)',
            ],
            borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: props.titulo,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: props.tituloY,
                },
            },
            x: {
                title: {
                    display: true,
                    text: props.tituloX,
                },
            },
        },
    };

    return (
        <div className={"container " + styles.Grafico}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default Grafico