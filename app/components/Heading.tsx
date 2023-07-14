'use client'

interface IHeading{
    title:string;
    subtitle?:string,
    center?:boolean
}

const Heading = (i:IHeading) => {
    return ( 
        <div className={`${i.center ? 'text-center' : 'text-start'}`}>
            <div className="text-2xl font-bold">
                {i.title}
            </div>
            <div className="font-light text-neutral-500 mt-2">
                {i.subtitle}
            </div>
        </div>
     );
}
 
export default Heading;