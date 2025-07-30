import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'; 
import { useEffect } from 'react';


const JobsItemDetails = ()=>{

    const {id} = useParams();

    const token = Cookies.get("jwtToken");

    useEffect(()=>{

        const fetchJobsDetails = async()=>{

            const api = `https://apis.ccbp.in/jobs/${id}`

            const options = {
                method : "Get",
                headers : {
                    Authorization : `Beaere ${token}`
                }
            }

            try {

                const response = await fetch(api,options);

                const data = await response.json(); 

                console.log( data );
                
            } catch (error) {
                console.log( error );
            }

        }

        fetchJobsDetails();



    },[]);

    return (

        <>
                <h1>{id}</h1>

                <h1> jobs item Details</h1>
        
        </>
    )
}



export default JobsItemDetails;