import { ExportExcelButton } from "./buttons/exportExcel";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Chart = ()=> {
  const values = [10, 15, 5, 20, 25, 15, 10, 5, 8, 12, 18, 22];
  const total = values.reduce((a, b) => a + b, 0);

  const data = {
    labels: [
      "Paints", "Beads", "Spoons", "Item 4", "Item 5",
      "Item 6", "Item 7", "Item 8", "Item 9", "Item 10", "Item 11", "Item 12"
    ],
    datasets: [
      {
        label: "Percentage",
        data: values.map(v => (v / total) * 100),
        backgroundColor: ["#34C759","#FFCC00","#FF383C"] // Tailwind's blue-500
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.toFixed(1)}%`
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20, // Force 0, 20, 40, 60, 80, 100
          callback: (value) => `${value}%`
        }
      },
      x:{
        grid:{
            display:false
        }
      }
    }
  };

  return (
    <div className="bg-white h-[300px] w-[400px] lg:w-[562px] xl:w-[800px] 2xl:w-[900px] lg:h-[450px] p-7 rounded-2xl shadow-md font-jakarta">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[16px] font-semibold">Inventory Summary</h2>
        <ExportExcelButton/>
      </div>
      <Bar className="my-4  w-full h-[500px] " data={data} options={{...options,maintainAspectRatio: false,responsive:true}} />
    </div>
  );
}
