const envelopeSVG = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    enableBackground='new 0 0 512 512'
    viewBox='0 0 512 512'
    id='envelope'
  >
    <path
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='20'
      d='M27.878,115.042c5.583-4.59,12.742-7.335,20.532-7.335H463.59c7.79,0,14.95,2.745,20.532,7.346'
    ></path>
    <path
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='20'
      d='M496,140.117v231.766c0,17.893-14.506,32.41-32.41,32.41H48.41c-17.9,0-32.41-14.511-32.41-32.41V140.117
c0-10.114,4.625-19.131,11.878-25.075l215.499,172.878c7.375,5.917,17.871,5.917,25.246,0l215.499-172.867
C491.375,120.986,496,130.003,496,140.117z'
    ></path>
    <line
      x1='195.769'
      x2='27.878'
      y1='249.727'
      y2='396.958'
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='20'
    ></line>
    <line
      x1='316.359'
      x2='484.25'
      y1='249.727'
      y2='396.958'
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='20'
    ></line>
  </svg>
);

const checkSVG = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 30 30'
    width='25px'
    height='25px'
    fill='green'
    className='svg-img'
  >
    <path d='M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z' />
  </svg>
);
const cancelSVG = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 30 30'
    width='25px'
    height='25px'
    fill='red'
    className='svg-img'
  >
    <path
      d='M10,10 L20,20 M10,20 L20,10'
      stroke='red'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);
const userSVG = (
  <svg
    height='64px'
    width='64px'
    version='1.1'
    id='Capa_1'
    xmlns='http://www.w3.org/2000/svg'
    // xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox='0 0 60.671 60.671'
    // xml:space="preserve"
    fill=''
    stroke=''
    transform='matrix(1, 0, 0, 1, 0, 0)'
  >
    <g id='SVGRepo_bgCarrier' strokeWidth='0' />

    <g
      id='SVGRepo_tracerCarrier'
      strokeLinecap='round'
      strokeLinejoin='round'
    />

    <g id='SVGRepo_iconCarrier'>
      <ellipse cx='30.336' cy='12.097' rx='11.997' ry='12.097' />
      <path d='M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9 C48.354,35.818,42.661,30.079,35.64,30.079z' />
    </g>
  </svg>
);

export { envelopeSVG, checkSVG, userSVG, cancelSVG };
