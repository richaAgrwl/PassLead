const EmailVerification = () => {
  return (
    <section className='form_bg'>
      <div className='container '>
        <div className='row'>
          <div className='col-md-6 col-12 verify_container '>
            <div className=''>
              <h3 className='text-center verify_text'>Email VeriFication</h3>
              <div className='row mt-3'>
                <input type='text' className='form-control verify_input' />
                <input type='text' className='form-control verify_input' />
                <input type='text' className='form-control verify_input' />
                <input type='text' className='form-control verify_input' />
                <input type='text' className='form-control verify_input' />
                <input type='text' className='form-control verify_input' />
              </div>
            </div>
          </div>

          <div className='col-md-6 col-12 right_img '></div>
        </div>
      </div>
    </section>
  );
};

export default EmailVerification;
