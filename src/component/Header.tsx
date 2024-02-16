import React, { useEffect } from 'react';
import AOS from 'aos';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState, persistor } from '@/redux/store';
import { reset } from '@/redux/reducer/Login';

const Header = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(
    (state: RootState) => state?.login?.user_info?.token
  );
  const user = useAppSelector((state: RootState) => state?.login?.user);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleLogout = () => {
    dispatch(reset());
    persistor.purge();
  };
  return (
    <header className='fixed-header'>
      <nav className='navbar navbar-expand-lg'>
        <div className='container'>
          <Link className='navbar-brand' href='/'>
            <Image
              src='../logo.svg'
              height={100}
              width={250}
              alt={'logo'}
              priority
            />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              {token && user?.role?.role === 'lead generator' ? (
                <li className='nav-item'>
                  <Link
                    className='nav-link active'
                    aria-current='page'
                    href='/add-leads'
                  >
                    Add Leads
                  </Link>
                </li>
              ) : null}

              <li className='nav-item'>
                <Link className='nav-link' href='/all-leads'>
                  Explore Leads
                </Link>
              </li>

              {!token && (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link login' href='/login'>
                      Login
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link className='nav-link signup' href='/registration'>
                      Registration
                    </Link>
                  </li>
                </>
              )}

              {token && (
                <>
                  <h6 style={{ color: '#465dfe' }} className='mt-2'>
                    {user?.name?.toUpperCase()}
                  </h6>

                  <li className='dropdown'>
                    <div className=' nav-link profile'>
                      <Link href='#'>
                        <Image
                          src='./profile.svg'
                          height={20}
                          width={20}
                          alt={''}
                          priority
                        />
                      </Link>

                      <div className='dropdown-content'>
                        <Link href='/profile'>Profile</Link>
                        <Link href='/login' onClick={handleLogout}>
                          Logout
                        </Link>
                      </div>
                    </div>
                  </li>
                  <li className='nav-item'> </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
