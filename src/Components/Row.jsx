import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Movie from './Movies'
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'



const Row = ({ title, fetchURL,rowId }) => {
    const [movie, SetMovie] = useState([])
  
    useEffect(() => {
        const getDatas = async () => {

            const data = await axios.get(fetchURL)
            return data
        }
        getDatas().then((Response) => {
            SetMovie(Response.data.results)
        })
    }
        , [fetchURL])

    
    const slideLeft = () =>{
        let slider = document.getElementById('slider'+rowId)
        slider.scrollLeft = slider.scrollLeft-500;
    }
    const slideRight = () =>{
        let slider = document.getElementById('slider'+ rowId)
        slider.scrollLeft = slider.scrollLeft+500;
    }
    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft className='bg-white left-5 rounded-full absolute opacity-30 hover:opacity-80 cursor-pointer z-30 hidden group-hover:block' size={40}
                onClick={slideLeft}
                />
                    {/* kéo ngang  */}
                    <div id={'slider'+ rowId} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                    {movie.map((item, id) => (  
                        <Movie key={id} item={item} />
                    ))}
                </div>
               <MdChevronRight className='bg-white right-5 rounded-full absolute opacity-30 hover:opacity-80 cursor-pointer z-30 hidden group-hover:block' size={40} 
               onClick={slideRight}/>
            </div>

        </>
    )
}

export default Row