import React from "react";
import styles from "../styles/Home.module.css";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

function Content(props) {
	const data1 = {
		labels: props.categoryNames,
		datasets: [
			{
				data: props.categoryTestsNo,
				backgroundColor: props.categoryColors,
				hoverBackgroundColor: props.categoryColors,
			},
		],
	};
	//data for bar chart
	const data = {
		labels: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		],
		datasets: [
			{
				label: "Points/ month",
				fill: true,
				lineTension: 0.1,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: "butt",
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: "miter",
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 0,
				pointHoverRadius: 0,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 0,
				pointRadius: 0,
				pointHitRadius: 0,
				data: props.barChartData,
			},
		],
	};
	return (
		<div>
			<div className="col">
				{/* chart started  */}
				<div className={styles.charts}>
					<div className={styles.bar}>
						{/* this h2 is for title if you want */}
						<h2></h2>
						<Line data={data} width={400} height={400} />
					</div>
					<div className={styles.circle}>
						{/* this h2 is for title if you want */}
						<h2></h2> 
						<Doughnut data={data1} width={400} height={400} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Content;
