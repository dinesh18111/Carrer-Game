import React, {
    useState
} from "react";
import Chart from "react-google-charts";

const AccrossJobChart = ({
    compOutput
}) => {
    console.log(compOutput[0]);
    const initSeries = {
        0: {
            type: "bar",
            hidden: false,
            opacity: 1,
            color: "#5effe4",
            altColor: "transparent",
            barWidth: 2,
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
        ["jobName", "Weighted Average", {
            role: "annotation"
        }],
        ...compOutput.map((d) => [
            d.jobName,
            parseInt(getWeightedAverage(d)),
            parseInt(getWeightedAverage(d)),
        ]),
    ];

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
            baseline: 0
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

export default AccrossJobChart;