import Cookies from 'js-cookie'
import Header from "../header";
import FilterSection from "../filterSection";
import DisplayAllJobs from "../displayAllJobs";
import "./index.css";
import { useEffect, useState } from "react";

const Jobs = () => {

  const [allValues,setValues] = useState({

    userArr : [],
    showLoader : false,
    emptype : [],
    minPackge : "",
    serachIn : ""

  });

  const token = Cookies.get("jwtToken");

  useEffect(()=>{

    const onFetchjobs = async ()=>{

      console.log(allValues.emptype);

      setValues({...allValues,showLoader : true});
      const api = `https://apis.ccbp.in/jobs?employment_type=${allValues.emptype}&minimum_package=${allValues.minPackge}&search=${allValues.serachIn}`; 

      const options = {
        method : "Get",
        headers : {
          Authorization : `Bearer ${token}`
        }
      }

      try {

        const response = await fetch(api,options); 

        const data = await response.json(); 

        if( response.ok === true ){

          setValues({...allValues,userArr : data.jobs,showLoader:false});
        }

        
      } catch (error) {
        console.log( error );
      }

    }

    onFetchjobs();

  },[allValues.serachIn,allValues.emptype]);


  const onChangeUserIn = (e)=>{

    if( e.key === "Enter" ){

      setValues({...allValues,serachIn : e.target.value});
    }

  }

  const changeEmpType = (value,isChecked)=>{

      if( isChecked === true ){

          setValues({...allValues,emptype : [...allValues.emptype,value]});// ["FULLTIME","PARTTIME"]

      }
      else{

          setValues({...allValues,emptype : allValues.emptype.filter( each=> each !== value)});// "PARTTIME" !== "FULLTIME"
      }

  }

  return (
    <div style={{height : "100vh"}}>
      <Header />

      <div className="container">

              <div className="row h-100">
                    <div className="col-4 p-3">

                            <FilterSection changeEmpType = {changeEmpType}/>

                    </div>
                    {
                      allValues.showLoader ? (
                        <div className='my-loader col-8'>

                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>

                        </div>

                      ) : (
                        <div className='col-8 p-3'>
<input 
  onKeyUp={onChangeUserIn} 
  type="search" 
  className='form-control w-75 border border-danger mb-3 search-input-visible-fix' 
/>                        <ul className="">

                              {
                                allValues.userArr.map(each=> <DisplayAllJobs userDetails = {each} key={each.id}/>)
                              }

                        </ul>
                        </div>
                      )
                    }
              </div>

      </div>
      
    </div>
  );
};

export default Jobs;