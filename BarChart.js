import React, {
    useState
} from "react";
import Chart from "react-google-charts";

const CustomBarChart = ({
    compOutput
}) => {
    let currency_symbol = "$"; //localStorage.getItem("currency_symbol");
    const initSeries = {
        0: {
            type: "bar",
            hidden: false,
            opacity: 1,
            color: "#56ab2f",
            altColor: "transparent",
            barWidth: 2,
            isVisible: true,
        },
        1: {
            type: "bar",
            hidden: false,
            color: "#FFB75E",
            altColor: "transparent",
            lineWidth: 2,
            isVisible: true,
        },
        2: {
            type: "bar",
            hidden: false,
            color: "#ff4b1f",
            altColor: "transparent",
            lineWidth: 2,
            isVisible: true,
        },
        3: {
            type: "bar",
            hidden: false,
            color: "#5effe4",
            altColor: "transparent",
            lineWidth: 2,
            isVisible: true,
        },

        4: {
            type: "bar",
            hidden: false,
            color: "#8000ff",
            altColor: "transparent",
            lineWidth: 2,
            isVisible: true,
        },
    };

    const weights = {
        skills: 0.4,
        habits: 0.3,
        interest: 0.2,
        preps: 0.1,
    };

    function getWeightedAverage(job) {
        let weightedSum = 0;
        Object.keys(weights).forEach((category) => {
            weightedSum += job[category] * weights[category];
        });
        return weightedSum.toFixed(1);
    }

    const [series, setSeries] = useState(initSeries);
    const [colum, setColum] = useState("Hotel");

    const data = [
        [
            "jobName",
            "Preps",
            {
                role: "annotation"
            },
            "Interes",
            {
                role: "annotation"
            },
            "habits",
            {
                role: "annotation"
            },
            "skills",
            {
                role: "annotation"
            },
            "weight",
            {
                role: "annotation"
            },
        ],
        ...compOutput.map((d) => [
            d.jobName,
            parseInt(d.preps),
            parseInt(d.preps),
            parseInt(d.interest),
            parseInt(d.interest),
            parseInt(d.habits),
            parseInt(d.habits),
            parseInt(d.skills),
            parseInt(d.skills),
            parseInt(getWeightedAverage(d)),
            parseInt(getWeightedAverage(d)),
        ]),
    ];
    const cursymbol = currency_symbol + " ".repeat(3);

    const option1 = {
        curveType: "function",
        titlePosition: "none",
        legend: {
            position: "top",
            alignment: "end",
            cursor: "pointer",
        },
        smoothLine: true,
        vAxis: {
            title: "Values",
            baseline: 0,
            format: cursymbol
        },
        hAxis: {
            title: "Jobs"
        },
        seriesType: "bars",
        tooltip: {
            isHtml: true,
            trigger: "visible"
        },
        series: series,
    };

    return ( <
        div >
        <
        Chart width = {
            "100%"
        }
        height = {
            "400px"
        }
        chartType = "ComboChart"
        data = {
            data
        }
        options = {
            option1
        }
        rootProps = {
            {
                "data-testid": "1"
            }
        }
        /> <
        /div>
    );
};

export default CustomBarChart;