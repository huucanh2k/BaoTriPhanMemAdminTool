import * as React from "react";
import  CalendarIcon from "../../../../assets/calendar.png";
import  CoinIcon from "../../../../assets/coin.png";
import  SampleGraph from "../../../../assets/graph_sample.png";

export interface IRevenueStatisticProps {}

export default function RevenueStatistic(props: IRevenueStatisticProps) {
  return <>
    <div style={{marginLeft: "100px", marginRight: "100px"}}>
      <h1 style={{color:"#57596B", fontSize:"40px"}}>Thống kê</h1>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div style={{ border: "2px solid #1f9d1d", width: "350px", backgroundColor: "#e9ffe8", borderRadius: "12px"}}>
          <div style={{marginTop: "30px", marginBottom: "20px", marginLeft: "20px", fontSize: "24px"}}>DOANH THU THÁNG TRƯỚC</div>
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <div style={{fontWeight: "500", color:"#1f9d1d", fontSize:"24px", marginBottom: "20px"}}>36.840.000 đ</div>
            <img src={CalendarIcon} height={40} style={{marginBottom: "10px"}}/>
          </div>
        </div>

        <div style={{ border: "2px solid #030237", width: "350px", backgroundColor: "#e8ecff", borderRadius: "12px"}}>
        <div style={{marginTop: "30px", marginBottom: "20px", marginLeft: "20px", fontSize: "24px", color: "#030237"}}>DOANH THU QUÍ TRƯỚC</div>
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <div style={{fontWeight: "500", color:"#000690", fontSize:"24px", marginBottom: "20px"}}>136.840.000 đ</div>
          <img src={CoinIcon} height={40} style={{marginBottom: "10px"}}/>
        </div>
      </div>
      </div>

      <div>
        <div style={{fontSize:"30px", fontWeight: "500", marginTop: "40px", color: "#001529"}}>Thống kê doanh thu năm</div>
        <img src={SampleGraph} height={300} style={{marginTop: "20px"}}/>
      </div>
    </div>

  </>
}
