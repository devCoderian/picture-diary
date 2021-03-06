import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';
import styled from "styled-components";

// const ArrowBtn = styled.button`
// border: 1px solid lightgray;
// border-radius: 5px;
// padding: 5px 10px;
// `

const CalendarBox = styled.div`
@media screen and (max-width: 960px) {
  display:none;
}
background: #fff;
margin-top: 30px;
border: 1px solid lightgray;
border-radius: 10px;
padding: 5px 10px;
min-width: 300px;
`
// @media screen and (max-width: 1200px) {
//   display:none;
// }
// @media screen and (max-width: 1200px) {
//   .box{
//     width: 15px;
//     height: 15px;
//     margin: 3px 3px;
//     font-size: 10px;
//   }
//   .text{
//     position: static;
//     width: 15px;
//     height: 15px;
//     color: #292929;
//   }
// }
const StyledBody = styled.div`

  text-align: center;
  margin: 20px;
  .row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    width: 100%;
  }
  .row.week{
    flex: none;
    width: 100%;
    border-bottom: 1px solid #E8E8E8;
  }
  .box{
    width: 23px;
    height: 23px;
    margin: 7px 3px;
    font-size: 14px;
  }
  .text{
    position: static;
    width: 23px;
    height: 23px;
    color: #292929;
  }
  .holiday,
  .grayed{
    color: #484848;
    pointer-events: none;
  }
  .day{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .selected{
    border-radius: 50%;
    background :#5A6D79;
    font-weight: 500;
    color: #fff;
  }
  .today{
    border:1px solid #5A6D79;
    border-radius: 50%;
    font-weight: 500;
    background : #fff;
    color:#5A6D79;
  }
  .isSelected{
    position: relative;
    color: #5A6D79;
    font-size: 10px;
    font-weight: 400;
  }
  .isToday{
    position: relative;
    color: #292929;
    font-size: 10px;
    font-weight: 400;
  }
  .none{
    display: none;
  }
`;


const StyledHeader = styled.div`

  display: flex;
  justify-content: center;
  align-content: center;
  margin: 20px;
  .thisMonth{
    font-weight: 700;
    color: #292929;
    line-height: 24px;
  }
  button{
    width:30px;
    height:30px;
    border: none;
    border-radius: 50%;
    margin:0 10px;
    background: #5A6D79;
    color: #fff
  }
  button svg{
  margin: 0 auto;
  display:block;
  }
`;

// .calendar-header{
//   background: #5A6D79;
// }
const CalenderCheck = () =>{
    const dayjs = require('dayjs');
    const weekday = require('dayjs/plugin/weekday');
    const isoWeek = require('dayjs/plugin/isoWeek');
    const weekOfYear = require('dayjs/plugin/weekOfYear');
  
    // day extend
    dayjs.extend(weekday);
    dayjs.extend(isoWeek);
    dayjs.extend(weekOfYear);
  
    const today = dayjs();
    const [viewDate, setViewDate] = useState(dayjs());
    const [selectDate, setSelectDate] = useState(dayjs());
  
    const createCalendar = () => {
      const startWeek = viewDate.startOf('month').week();
      const endWeek = viewDate.endOf('month').week() === 1 ? 53 : viewDate.endOf('month').week();
      let calender = [];
  
  
      for (let week = startWeek; week <= endWeek; week++) {
        calender.push(
            <div className="row" key={week}>
            {Array(7).fill(0).map((n, i) => {
              let current = viewDate.startOf('week').week(week).add(n + i, 'day');
              if (viewDate.format('MM') === '12') {
                current = viewDate.startOf('week').week(week - 52).add(n + i, 'day');
              }
              // ?????? ?????? (??????)
              let isSelected = selectDate.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
              let isToday = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'today' : '';
              let isNone = current.format('MM') === viewDate.format('MM') ? '' : 'none';
              return (
                <>
                
                  <div className={`box`} key={`${week+i}`} >
                    <div className={`text ${isSelected} ${isToday} ${isNone}`} onClick={() => { setSelectDate(current) }}>
                      <span className={`day`}>{current.format('D')}</span>
                      {isToday ? (<span className="isToday">??????</span>)
                        : isSelected ? (<span className="isSelected"></span>) : null}
                    </div>
                  </div >
                </>
              )
            })
            }
           </div>
        )
      }
      return calender;
    }
  
    const changeMonth = (date, changeString) => {
      switch (changeString) {
        case 'add':
          return setViewDate(viewDate.add(1, 'month'))
        case 'subtract':
          return setViewDate(viewDate.subtract(1, 'month'))
        default:
          return date;
      }
    }
  
    return (
      <>
          <CalendarBox>
          <Container>
                    <StyledHeader>
                    <div className ="calendar-header">
                    <button onClick={() => changeMonth(viewDate, 'subtract')}>
                    <ArrowLeft></ArrowLeft> 
                    </button> 
                    <span className="thisMonth">{viewDate.format("MM")}???</span>
                    <button onClick={() => changeMonth(viewDate, 'add')}>
                    <ArrowRight></ArrowRight>
                    </button> 
                    </div>
                    </StyledHeader>
                  <StyledBody>
                   
                  <div className="row week">
                    <div className="box"><span className="text">???</span></div>
                    <div className="box"><span className="text">???</span></div>
                    <div className="box"><span className="text">???</span></div>
                    <div className="box"><span className="text">???</span></div>
                    <div className="box"><span className="text">???</span></div>
                    <div className="box"><span className="text">???</span></div>
                    <div className="box"><span className="text">???</span></div>
                  </div>
                 
                  {createCalendar()}
                  </StyledBody>
            
          </Container>
          </CalendarBox>
          </>
    )
  }
  
  
  


export default CalenderCheck;