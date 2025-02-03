import Reac,{useState} from 'react'
import assets from '../assets/assets'
import axios from 'axios'
import { backendURL } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setbestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const formData=new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestSeller",bestSeller)
      formData.append("sizes",JSON.stringify(sizes))
     image1 && formData.append("image1",image1)
     image2 &&  formData.append("image2",image2)
     image3 && formData.append("image3",image3)
     image4 && formData.append("image4",image4)
     
     const response = await axios.post(backendURL + '/api/product/add', formData, {
      headers: {
        Authorization: `Bearer ${token}`,  // ✅ Correct
        "Content-Type": "multipart/form-data"
      }
      
    });
    console.log(response.data)
    if(response.data.success)
    {
      toast.success(response.data.message)
      setName('')
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
      setPrice('')
      setDescription('')
    }
    else{
      toast.error(response.data.message)
    }
    
    
    }
    catch (err)
    {
      console.log(err.message)
      toast.error(err.message)

    }


  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full items-start gap-2  '>
      <div>
        <p className='mb-2 text-base'>upload image</p>
      </div>
      <div className='flex gap-2'> 

       <label htmlFor="image1">
        <img className='w-16' src={!image1 ?assets.upload_area :URL.createObjectURL(image1)} alt="" />
        <input onChange={(e)=>{setImage1(e.target.files[0])}}   type="file" id='image1' hidden />
       </label>
       <label htmlFor="image2">
        <img className='w-16' src={!image2 ?assets.upload_area :URL.createObjectURL(image2)} alt="" />
        <input onChange={(e)=>{setImage2(e.target.files[0])}}  type="file" id='image2' hidden />
       </label>
       <label htmlFor="image3">
        <img className='w-16' src={!image3 ?assets.upload_area :URL.createObjectURL(image3)} alt="" />
        <input  onChange={(e)=>{setImage3(e.target.files[0])}} type="file" id='image3' hidden />
       </label>
       <label htmlFor="image4">
        <img className='w-16' src={!image4 ?assets.upload_area :URL.createObjectURL(image4)} alt="" />
        <input onChange={(e)=>{setImage4(e.target.files[0])}}  type="file" id='image4' hidden />
       </label>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className=' px-4 py-2 border w-full sm:w-1/4' placeholder='product name' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product decription</p>
        <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} rows={4} className=' px-4 py-2 w-full sm:w-1/2 border' name="" id="" placeholder='write the description of product' required></textarea>
      </div>
      <div className='flex flex-col sm:flex-row w-full gap-1 '>
        <div className='w-full'>
        <p className=''>product category</p>
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className='w-full px-2 py-1' name="" id="">
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>
      <div className='w-full'>
        <p>Sub category</p>
        <select value={subCategory} onChange={(e)=>{setSubCategory(e.target.value)}} className='w-full px-2 py-1' name="" id="">
        <option value="Topwear">Topwear</option>
        <option value="Bottomwear">Bottomwear</option>
        <option value="Winterwear">Winterwear</option>
        </select>
      </div>
      <div>
        <p>Product Price</p>
        <input value={price} onChange={(e)=>{setPrice(e.target.value)}} type="Number" name="" id="" placeholder='25' className=' px-2 py-1' required/>
      </div>
      </div>
      <div>
        <p>Product Sizes</p>
        <div className='flex  gap-4'>
          <div onClick={()=>{setSizes((prev)=>(prev.includes("S")) ? prev.filter((item=> item !=="S")):[...prev,"S"])}}>
            <p className={`${sizes.includes("S") ? 'bg-pink-200' :'bg-slate-200'} px-3 py-1 cursor-pointer `}>S</p>
          </div>
          <div>
            <p onClick={()=>{setSizes((prev)=>prev.includes("M") ? prev.filter((item)=>item !=="M"):[...prev,"M"])}}className={`${sizes.includes("M") ? 'bg-pink-200' :'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div>
            <p onClick={()=>{setSizes((prev)=>prev.includes("XL") ? prev.filter((item)=>item !=="XL") :[...prev,"XL"])}}className={`${sizes.includes("XL") ? 'bg-pink-200' :'bg-slate-200'} px-3 py-1 cursor-pointer `}>XL</p>
          </div>
          <div>
            <p onClick={()=>{setSizes((prev)=>prev.includes("XLL") ? prev.filter((item)=>item !=="XLL"):[...prev,"XLL"])}}  className={`${sizes.includes("XLL") ? 'bg-pink-200' :'bg-slate-200'} px-3 py-1 cursor-pointer `}>XLL</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2 mt-2 '>
        <input value={bestSeller} onChange={()=>setbestSeller((prev)=>!prev)} type="checkbox" name="" id="bestSeller"  />
        <label className='cursor-pointer' htmlFor="bestSeller">Add to bestSeller</label>
      </div>
      <button type='submit' className='px-4 py-2 bg-black text-white rounded '>ADD</button>
    </form>
  )
}

export default Add
