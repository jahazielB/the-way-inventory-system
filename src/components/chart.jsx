import { ExportExcelButton } from "./buttons/exportExcel";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,ArcElement
);

export const Chart = ({datas})=> {
  const total = datas.reduce((acc,row)=>acc + row.item_count,0)
  const randomHSL = () => {
  const hue = Math.floor(Math.random() * 360) // 0–359
  return `hsl(${hue}, 70%, 50%)` // fixed saturation + lightness
}

  const data = {
    labels: datas.map(d=>d.customer_name),
    datasets: [
      {
        label: "Percentage",
        data: datas.map(d => d.item_count ),
        backgroundColor: datas.map(d=>randomHSL())
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false},
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} items used`
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
        },
        ticks: {
          autoSkip: false,
         maxRotation: 0,
         minRotation: 0,
         callback: function(value, index, ticks) {
        let label = this.getLabelForValue(value);
        return label.length > 10 ? label.slice(0, 5) + "…" : label;
      }
        }
      }
    }
  };
  const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "right", // or "bottom"
      labels: {
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const dataset = context.dataset;
          const total = dataset.data.reduce((a, b) => a + b, 0);
          const value = context.raw;
          const percentage = ((value / total) * 100).toFixed(1);
          return `${context.label}: ${value} items used (${percentage}%)`;
        }
      }
    }
  }
};


  return (
    <div>
      <div className="hidden sm:block bg-white h-[300px]   md:w-full lg:w-[clamp(700px,70vw,2000px)] lg:h-[450px] p-10 max-lg:px-4 lg:p-12 pt-2 max-sm:px-4  rounded-2xl shadow-md font-jakarta">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] font-semibold">Inventory Summary</h2>
          <span>{new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        </div>
        <Bar className="my-3  w-full h-[500px] " data={data} options={{...options,maintainAspectRatio: false,responsive:true, indexAxis:'x'}} />
      </div>
      <div className="flex justify-center items-center sm:hidden">
        <Pie  data={data} options={pieOptions}></Pie>
      </div>
    </div>
    
  );
}
