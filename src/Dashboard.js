import React,{useRef, useState} from 'react';
import Select from 'react-select';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { click } from '@testing-library/user-event/dist/click';
import { Button, Modal } from 'react-bootstrap';
import { Radio } from '@mobiscroll/react-lite';
import { toast,ToastContainer } from 'react-toastify';
import { Page,Document } from 'react-pdf';
import { create,IPFSHTTPClient } from 'ipfs-http-client';

import { ethers } from 'ethers';
import { Rating } from 'react-simple-star-rating';

function showsubmit(props) {
    
    const {user,type,email,loc,phno,modltype,isapproved}=props;
    return (
        <div className="modal fade" id="modal">
            <div className='modal-content'>
                <div className='modal-header bg-default'>
                   <span className="panel">
                    <h1 className='left'>{user}</h1>
                    <h2 className='right'>{type}</h2>
                    </span>
                </div>
                <form action="/" method='POST'  className='form-group text-primary' encType='application/x-www-url-encoded'>
                <div className='modal-body bg-success'>
                   
                        <div className='container-fluid justify-content-center'>
                            <input type="text" className='form-control' placeholder='Designation'/>
                            <input type="text" className='form-control' placeholder='Affliation'/>
                            <input type="password" className='form-control' pattern='[0-9]' placeholder='ORCIDID'/>
                        
                        </div>
                </div>
                <div className='modal-footer bg-warning'>
                <div className="tacbox bg-warning">
     
     <input id="checkbox" type="checkbox" />
     <label for="checkbox"> I agree to these <a href="#">Terms and Conditions</a>.</label>
   </div>
                    <button className='btn btn-success' data-dismiss="#modal">Confirm Submission</button>
                </div>
                </form>
            </div>
        </div>
    );

}

function Payment(props) {
    const [addr,setaddr]=useState("0xb6cba76Df107aB90601866C4c375Ac4349990117");
    const [ethr,setethr]=useState(0.02);
    const [money,setmoney]=useState(0);
    const pay=()=>{

    }
    return (
        <>
        <div><ToastContainer/></div>
        <form className='form-group' action='/dashboard'  encType='application/x-www-form-urlencoded'>
        <input className='form-control text-primary' value={addr} disabled required placeholder='Email Address' name='email' type='email'/>
        <input className='form-control text-primary' value={ethr} disabled required  placeholder='Password' name='pass' type='password'/>
        
       <input className='form-check-input'  name='rem' id='flexCheckDefault' type='checkbox'/>
   <label class="form-check-label" for="flexCheckDefault">
    Remember Me 
  </label>
  <br/>
  <button onClick={pay}  className='btn btn-success'>Pay And Submit</button>
 
       </form>
       </>
    );
}

function Dashboard_component(props) {
    const {user,email,country,role,type}=props;
    const isaproved=useRef(false);
    const [addr,setaddr]=useState("0xb6cba76Df107aB90601866C4c375Ac4349990117");
    const [ethr,setethr]=useState(0.02);
    const [money,setmoney]=useState(false);
    const [txs,settsx]=useState([]);
    const mapStateToProps=state=>({
        ...state,email:email,uname:user,location:country,role:role
    });
    props=mapStateToProps;
    //isaproved=this.props.verified;
    const dopayment=async (settransac,ethr,addr)=>{
        if(window.ethereum) {
            try{
            await window.ethereum.send("eth_requestAccounts");
            console.log(addr,ethr);
            const provider=await ethers.providers(window.ethereum);
            const signer=provider.getSigner();
            ethers.utils.getAddress(addr);
            const transac=await signer.sendTransaction({
                to:addr,
                value: ethers.utils.parseEther(ethr)
            });
            console.log(transac);
            settransac([transac]);
            toast.success('Saving status...', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        } catch(err) {
            toast.error('Payment Failed...', {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }

        }
    };
    const openpay=()=>{
        setmoney(true);
    };
    const closepay=async()=>{
        await dopayment(settsx,ethr,addr);
        toast.success('Saving status...', {
            position: toast.POSITION.BOTTOM_CENTER
        });
        setTimeout(() => {
            setmoney(false);
        }, 2000);

    };
    const pay=()=>{

    }
    const emailuser=useRef("");
    const projectId = 'XXXXXXXXXX';   //your project id
    const projectSecret = 'XXXXXXXXXXXXX';  //yout project secret
    const auth = 'Basic ' + (projectId + ':' + projectSecret).toString('base64');
    const client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: auth,
        },
    });
    const [urlarr,seturlarr]=useState([]);
    const [file,setfile]=useState("");
    const mailer=()=>{
        const subject="Approval Status Brahma Blockchain";
        const body=isaproved ? "Your profile is approved":"Your profile is not approved";
        let params = subject || body ? '?' : '';
        if (subject) params += `subject=${encodeURIComponent(subject)}`;
        if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;
      
        return <a href={`mailto:${emailuser}${params}`}>{Dashboard_component}</a>;
    };
    const options=[
        {value:'R1',label:'Reviewer1'},
        {value:'R2',label:'Reviewer2'},
        {value:'R3',label:'Reviewer3'},
    ];
    const confedit=()=>{
        toast.info('Saving edits...', {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }
    const [mailerbox,setmailbox]=useState(false);
    const mailunload=()=>{
        setmailbox(false);
    }
    const handlemail=()=>{
        setmailbox(true);
    }
    const mailconf=()=>{
        toast.success('Saving status...', {
                position: toast.POSITION.BOTTOM_CENTER
            });
            setTimeout(() => {
                setmailbox(false);
                
            }, 4000);
    }
    const showpubnot=()=>{
        toast.success('Getting approved articles Published...', {
            position: toast.POSITION.BOTTOM_CENTER
        });
    };
    const [clicked,setclicked]=useState(false);
    const [clickhis,setclickhis]=useState(false);
    const [seloption,setseloption]=useState(null);
    const [reviewid,setreviewid]=useState("");
    const [authorid,setauthorid]=useState("");
    const [reviewmod,setrevmod]=useState(false);
    const [remarks,setremarks]=useState("");
    const [nump,setnump]=useState(null);
    const [pageno,setpageno]=useState(1);
    const [edited,changedit]=useState(false);
    const [pubmod,setpubmod]=useState(false);
    const closepubmod=()=>{
        toast.success("Pending are approved papers now.");
        setpubmod(false);
    };
    const openpubmod=()=>{
        setpubmod(true);
    };
    const editor=()=>{
        changedit(true);
    }
    const loadpdfsuccess=({nump})=>{
        setpageno(pageno);
    }
    
    const approve=useRef(false);
    const reject=useRef(false);
    const [pdfer,setpdfer]=useState(false);
    const changeremark=(event)=>{
        setremarks(event.target.value);
    };
    const pdfload=()=>{
        setpdfer(true);
    }
    const pdfunload=()=>{
        setpdfer(false);
    }
    const openrev=()=>{
        setrevmod(true);
    }
    const closerev=()=>{
        setrevmod(false);
    };
    const openmodal=()=>{
        setclicked(true);
        
    }
    const closemodal=()=>{

       
        setclicked(false);
        setTimeout(() => {
            setmoney(true);
        }, 2000);
    }
    const openmodalhis=()=>{
        setclickhis(true);
    }
    const closemodalhis=()=>{
        setclickhis(false);
    }
    const handler =()=>{

    };
    const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)

    // other logic
  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)

    const readandupload=async (event)=>{
        event.preventDefault();
        try{
        const created=await client.add(file);
        const urlt=`https://ipfs.infura.io/ipfs/${created.path}`;
        seturlarr(prev=>[...prev,urlt]);
        } catch(err) 
        {
            console.log(err.message);
        }
    };
    const uploadfile=(event)=>{
        const data=event.target.files[0];
        const reader=new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend=()=>{
            setfile(Buffer(reader.result))
        }
        event.preventDefault();
    };
    if(type.length){
        if(type=="Author") {
            const preloadFiles = [
                { name: 'Books', size: 500, type: '.png' },
                { name: 'Movies', size: 12000, type: '.pdf' },
                { name: 'Study materials', size: 500000, type: '.docx' },
            ];
            const path = {
                removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove',
                saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save'
            };
            console.log(clicked);
    return (
        <>
        <p className="text-success">Welcome {type} to Brahma</p>  
        <form className='form-group' onSubmit={readandupload}>
       <span className='panel'>
        <input type="file" onChange={uploadfile} className='form-control btn btn-primary' name='fileu'/>
        <button style={{marginBottom:17,marginTop:17}} className='btn btn-success'>Upload File</button>
       </span>
       </form>
       <span class="wrapper">
        <button onClick={openmodal} className='btn btn-success'>Submit Paper</button>
       
        <button style={{marginLeft:4}} onClick={openmodalhis} className='btn btn-info'>Show History</button>
        </span>
        <Modal show={clicked}>
            <Modal.Header closeButton onClick={closemodal}>
            <span className="panel">
                    <h1 className='left'>{user}</h1>
                    <h2 className='right'>{type}</h2>
                    </span>
            </Modal.Header>
            <form action="/" method='POST'  className='form-group text-primary' encType='application/x-www-url-encoded'>
            <Modal.Body >
            <div className='container-fluid justify-content-center'>
                            <input type="text" id="desg" style={{marginBottom:4}} name="desg" className='form-control' placeholder='Designation'/>
                            <input type="text" id="affl" style={{marginBottom:4}} name="affl" className='form-control' placeholder='Affliation'/>
                            <input type="password" id="orcd" style={{marginBottom:4}} name="orcd" className='form-control' pattern='[0-9]' placeholder='ORCIDID'/>
                        
                        </div>
            </Modal.Body>
            <Modal.Footer>
            <div className="tacbox bg-warning">
     
     <input id="checkbox" type="checkbox" />
     <label style={{marginLeft:8}} for="checkbox"> I agree to these <a href="#">Terms and Conditions</a>.</label>
   </div>
                <Button variant='secondary' onClick={closemodal}>Close</Button>
                <Button variant='primary' onClick={closemodal}>Confirm Submission</Button>
            </Modal.Footer>
            </form>
        </Modal>

        <div><ToastContainer/></div>
        <Modal show={money}>
            <Modal.Header closeButton onclick={closepay}>
            <h1 className='left'>{user}</h1>
                    <h2 className='right'>{type}</h2>
            </Modal.Header>
            
            <Modal.Body >
        <input className='form-control text-primary' value={addr} disabled required placeholder='Email Address' name='email' type='password'/>
        <input className='form-control text-primary' value={`${ethr}💲`} disabled required  placeholder='Password' name='pass' type='text'/>
        
            </Modal.Body>
            <Modal.Footer >
            <input className='form-check-input'  name='rem' id='flexCheckDefault' type='checkbox'/>
   <label class="form-check-label" for="flexCheckDefault">
    I want to proceed 
  </label>
  <br/>
  <button onClick={pay}  className='btn btn-success' onClick={closepay}>Pay And Submit</button>
 
            </Modal.Footer>

        </Modal>
        <Modal show={clickhis}>
            <Modal.Header closeButton onClick={closemodalhis}>
            <span className="panel">
                    <h1 className='left'>{user}</h1>
                    <h2 className='right'>{type}</h2>
            </span>
            </Modal.Header>
            <form action="/" method='POST'  className='form-group text-primary' encType='application/x-www-url-encoded'>
            <Modal.Body >
            <div className='container-fluid justify-content-center'>
            <table className='table table-striped table-hover'>
                <thead>
                <th className='bg-default'>Paper ID</th>
                    <th className='bg-success'>Reviewer ID</th>
                    <th className='bg-default'>Editor ID</th>
                    <th className='bg-primary'>Publisher Link</th>
                    <th className='bg-danger'>Remarks</th>
                    <th className='bg-info'> Status</th>
                </thead>
                <tr>
                    <td>P1</td>
                    <td>A1</td>
                    <td>E1</td>
                    <td><a href="#">{urlarr.length ? urlarr.map((ind)=>ind):<strong>Demo</strong>}</a></td>
                    <td><textarea placeholder='Throw yours remarks here' className='form-control'></textarea></td>
                    <td>Approved</td>
                </tr>
             </table>
            </div>
            </Modal.Body>
            <Modal.Footer>
            
                <Button variant='secondary' onClick={closemodalhis}>Close</Button>
                <Button variant='primary' onClick={closemodalhis}>Checked</Button>
            </Modal.Footer>
            </form>
        </Modal>
        </>
    );
        }

    else if(type=="Reviewer"){
        return (
            <>
             <table className='table table-striped table-hover'>
                <thead>
                    <th className='bg-success'>Author ID</th>
                    <th className='bg-info'>Editor ID</th>
                    <th className='bg-primary'>File Link</th>
                    <th className='bg-danger'>Remarks</th>
                </thead>
                <tr>
                    <td>A1</td>
                    <td>E1</td>
                    <td><a href='#'>Link demo</a></td>
                    <td><textarea placeholder='Throw yours remarks here' onKeyUp={changeremark} id='remarksrev' className='form-control'></textarea></td>
                </tr>
             </table>
             <button className='btn btn-success'>Review Pending Papers</button>
             <button style={{marginTop:8}} onClick={openrev} className='btn btn-primary'>Confirms Reviews</button>
             <Modal show={reviewmod}>
            <Modal.Header closeButton onClick={closerev}>
            <span className="panel">
                    <h1 className='left'>{user}</h1>
                    <h2 className='right'>{type}</h2>
            </span>
            </Modal.Header>
            <form action="/" method='POST'  className='form-group text-primary' encType='application/x-www-url-encoded'>
            <Modal.Body >
            <div className='container-fluid justify-content-center'>
                            <input type="text" id="desg" style={{marginBottom:4}} name="desg" className='form-control' placeholder='Designation'/>
                            <input type="text" id="affl" style={{marginBottom:4}} name="affl" className='form-control' placeholder='Affliation'/>
                            <input type="password" id="orcd" style={{marginBottom:4}} name="orcd" className='form-control' pattern='[0-9]' placeholder='ORCIDID'/>
                        
                        </div>
            <div className='container-fluid justify-content-center'>
                
            <table className='table table-striped table-hover'>
                <thead>
                <th className='bg-default'>Paper ID</th>
                    <th className='bg-default'>Editor ID</th>
                    <th className='bg-primary'>ORCIDID</th>
                    <th className='bg-info'>Remarks</th>
                    <th className='bg-success'> Approve</th>
                    <th className='bg-danger'>Reject</th>
                </thead>
                <tr>
                    
                    <td>P1</td>
                    <td>E1</td>
                    <td>DEMO</td>
                    <td>{remarks}</td>
                    <td ><Radio value={approve}>Approve</Radio></td>
                    <td ><Radio value={reject}>Reject</Radio></td>
                </tr>
             </table>
            </div>
            </Modal.Body>
            <Modal.Footer>
            
                <Button variant='secondary' onClick={closerev}>Close</Button>
                <Button variant='primary' onClick={closerev}>Send Review Result</Button>
            </Modal.Footer>
            </form>
        </Modal>
            </>
        );
    }
    else if(type=="Admin") {
        const [apprv,setapprv]=useState(false);
        const notify=async () =>{
            await fetch('https://api.paytripapp.com/user/J220701/verify',{
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'username': email
            })
        }).then(resp=>console.log(resp)).then(data=>{console.log(JSON.stringify(data));
            if(data.includes("fail")) {
                toast.error('Not able to approve...', {
                    position: toast.POSITION.TOP_RIGHT
                 });
            } else {
                setapprv(true);
                toast.success('Approving user...', {
                    position: toast.POSITION.TOP_RIGHT
                 });
                 const notify=async () =>{
                    await fetch('https://api.paytripapp.com/user/J220701/notification',{
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        'username': email
                    })
                }).then(resp=>console.log(resp)).then(data=>{console.log(JSON.stringify(data));
                    if(data.includes("fail")) {
                        toast.error('Not Able to Notify user...', {
                            position: toast.POSITION.TOP_RIGHT
                         });
                    } else {
                        
                        toast.success('Notifying user...', {
                            position: toast.POSITION.TOP_RIGHT
                         });
                    }
                })
            }
                 }
            })
        }//https://api.paytripapp.com/user/J220701/notification
        ;//https://api.paytripapp.com/user/J220701/verify
        return (
            <>
            <ToastContainer/>
             <table className='table table-striped table-hover'>
                <thead>
                    <th className='bg-success'>UserID</th>
                    <th className='bg-info'>User Type</th>
                    <th className='bg-primary'>Location</th>
                    <th className='bg-success'>Phone no</th>
                    <th className='bg-info'>Email Id</th>
                    <th className='bg-danger'>IsApproved</th>
                </thead>
                <tr>
                    <td>A1</td>
                    <td>Author(Sample)</td>
                    <td>India</td>
                    <td>Sample-phone</td>
                    <td>Email Id</td>
                    <td>{isaproved.current}</td>
                </tr>
             </table>
             <button onClick={handlemail} className='btn btn-primary'>Approve Pending Users</button>
             <Modal  show={mailerbox}>
            <Modal.Header closeButton onClick={mailunload}>
            <span className="panel">
                    <h1 className='left'>{user}</h1>
                    <h2 className='right'>{type}</h2>
                    </span>
            </Modal.Header>
            <Modal.Body style={{overflowX:'scroll'}}>
            <table  className='table table-striped table-hover'>
                <thead>
                    <th className='bg-success'>UserID</th>
                    <th className='bg-info'>User Type</th>
                    <th className='bg-primary'>Location</th>
                    <th className='bg-success'>Phone no</th>
                    <th className='bg-info'>Email Id</th>
                    <th className='bg-danger'>Status</th>
                    <th className='bg-danger'>Notify Them</th>
                </thead>
                
                <tr>
                    <td>A1</td>
                    <td>Author(Sample)</td>
                    <td>India</td>
                    <td>Sample-phone</td>
                    <td ref={emailuser}>abc@gmail.com</td>
                    <td><Radio ref={isaproved}>Approve</Radio></td>
                    <td><button onClick={mailer} className='btn btn-primary'>Notify Them</button></td>
                </tr>
             </table>
            </Modal.Body>
            <Modal.Footer>
            <div className="tacbox bg-warning">
     
     <input id="checkbox" type="checkbox" />
     <label style={{marginLeft:8}} for="checkbox"> I agree to <a href="#">Terms and Conditions</a> of approval.</label>
   </div>
                <Button variant='secondary' onClick={mailunload}>Close</Button>
                <Button variant='primary' onClick={mailconf}>Confirm Status</Button>
            </Modal.Footer>
        </Modal>
            </>
        );
    }
    else if(type=="Editor"){
        return (
            <>
            <ToastContainer/>
             <table className='table table-striped table-hover'>
                <thead>
                    <th className='bg-success'>Author ID</th>
                    <th className='bg-info'>Select Reviewer</th>
                    <th className='bg-primary'>Action</th>
                    <th className='bg-danger'>Remarks</th>
                </thead>
                <tr>
                    <td>A1</td>
                    <td><Select value={seloption} options={options} onChange={setseloption}/></td>
                    <td><a onClick={pdfload} href="#">EDIT</a></td>
                    <td><textarea placeholder='Throw yours remarks here' className='form-control'></textarea></td>
                </tr>
             </table>
             <button onClick={pdfload} className='btn btn-success'>Edit Pending Papers</button>
             <Modal show={pdfer}>
            <Modal.Header closeButton onClick={pdfunload}>
            <span className="panel">
                    <h1 className='left'>{user}</h1>
                    <h2 className='right'>{type}</h2>
                    </span>
            </Modal.Header>
            <form action="/" method='POST'  className='form-group text-primary' encType='application/x-www-url-encoded'>
            <Modal.Body >
            <Button variant='primary' onclick={editor}>Edit Now</Button>
            <div className='container-fluid'>
                <Document file="" show={!edited} onClick={loadpdfsuccess}>
                    <Page pageNumber={pageno}/>
                </Document>
                <p>{pageno} of {nump}</p>
                <textarea show={edited} className='form-control text-primary'>

                </textarea>
            </div>
            </Modal.Body>
            <Modal.Footer>
            <div className="tacbox bg-warning">
     
     <input id="checkbox" type="checkbox" />
     <label style={{marginLeft:8}} for="checkbox"> I am sure to Edit. Post Edit File: <a href="#">File Link</a>.</label>
   </div>
                <Button variant='secondary' onClick={pdfunload}>Close</Button>
                <Button variant='primary' onClick={pdfunload}>Save Edits</Button>
            </Modal.Footer>
            </form>
        </Modal>
             <button style={{marginLeft:5}} onClick={confedit} className='btn btn-success'>Commit Edit</button>
            </>
        );
    }
    else if(type=="Publisher"){
        return (
            <>

                <table className='table table-striped table-hover'>
                    <thead>
                        <th className='bg-success'>Author</th>
                        <th className='bg-default'>ISSN</th>
                        <th className='bg-info'>Status</th>
                        <th className='bg-primary'>Journal</th>
                        <th className='bg-success'>Pub Id</th>
                    </thead>
                    <tr>
                        <td>A1</td>
                        <td>ISSNNO</td>
                        <td>Approved</td>
                        <td><a href='#'>Link Journal demo</a></td>
                        <td>PID-1234</td>
                        </tr>
                 </table>
                 <button  onClick={openpubmod} className='btn btn-primary'>Publish pending approvals</button>
              <ToastContainer/>
                <Modal show={pubmod}>
            <Modal.Header closeButton onClick={closepubmod}>
            <span className="panel">
                    <h1 className='left'>{user}</h1>
                    <h2 className='right'>{type}</h2>
            </span>
            </Modal.Header>
            <form action="/" method='POST'  className='form-group text-primary' encType='application/x-www-url-encoded'>
            <Modal.Body  style={{overflowX:'scroll'}}>
            <div className='container-fluid justify-content-center'>
            <table className='table table-striped table-hover'>
                <thead>
                <th className='bg-default'>Paper ID</th>
                    <th className='bg-success'>Reviewer ID</th>
                    <th className='bg-secondary'>Editor ID</th>
                    <th className='bg-primary'>Author ID</th>
                    <th className='bg-danger'>ISSN</th>
                    <th className='bg-info'> ORCIDID</th>
                    <th className='bg-warning'>Publisger Rating</th>
                </thead>
                <tr>
                    <td>P1</td>
                    <td>R1</td>
                    <td>E1</td>
                    <td>A1</td>
                    <td>DEMO</td>
                    <td>DEMO</td>
                    <th><Rating
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        /* Available Props */
      /></th>
                </tr>
             </table>
            </div>
            </Modal.Body>
            <Modal.Footer>
            
                <Button variant='secondary' onClick={closepubmod}>Close</Button>
                <Button variant='primary' onClick={closepubmod}>Confirm to publish</Button>
            </Modal.Footer>
            </form>
        </Modal>
               <ToastContainer/>
                </>
        );
    }
}

}

export function Dashboard(props) {
    const cuser=props;
    const type="Author";
    const name=cuser.name;
    const options=[
        {value:type,label:type},
        {value:"Admin",label:"Admin"},
        {value:"Reviewer",label:"Reviewer"},
        {value:"Editor",label:"Editor"},
        {value:"Publisher",label:"Publisher"},
    ];
    const [role,setrole]=useState("Reviewer");
    const [user,setuser]=useState("user");
    const [country,setcountry]=useState("country");
    const [email,setemail]=useState("email");

    const mapStateToProps=state=>({
        ...state
    });

    props=mapStateToProps;

    /*
    setrole(this.props.role);
    setuser(this.props.uname);
    setcountry(this.user.country);
    setemail(this.user.email);
    */
    
    const [seloption,setseloption]=useState(null);
    return (
        <>
         <label class="text-danger text" for="type">Welcome {name} as 
          </label>
          <Select value={type} options={options} onChange={setseloption}/>
          <Dashboard_component type={seloption ? seloption.value : ""}/>
        </>
    );
}