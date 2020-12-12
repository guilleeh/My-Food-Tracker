export const Home = () => {
  return (
    <>
      <div className='home h-100 flex'>
        <div className='lander'>
          <h1>My Food Tracker</h1>
          <p className='text-muted'>
            A simple app to track the food you eat.
        </p>
        </div>
      </div>
      <style jsx>
        {`
          .home .lander {
            padding: 100px 0;
            text-align: center;
          }
        `}
      </style>
    </>
  )
}