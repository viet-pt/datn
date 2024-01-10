import React, { useState, useRef, useEffect } from 'react';
import Transition from 'utils/Transition';
import UserAvatar from 'assets/images/user-avatar-32.png';
import { faChevronRight, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ROUTES } from 'global/routes';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from 'redux/action/userAction';

function UserMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);
  const userName = useRef(localStorage.getItem('username'));
  const history = useHistory();
  const dispatch = useDispatch();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || dropdown.current?.contains(target) || trigger.current?.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleLogout = () => {
    setDropdownOpen(!dropdownOpen);
    dispatch(removeUser());
    history.push(ROUTES.LOGIN);
  }

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800 capitalize">{userName.current || 'ADShaman'}</span>
          <svg className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
            <div className="font-medium text-gray-800">{userName.current || 'ADShaman'}</div>
            <Link to={ROUTES.PROFILE}>
              <span className="text-xs text-gray-500 mr-1">View profile</span>
              <FontAwesomeIcon icon={faChevronRight} color="#64748B" size="xs" />
            </Link>
          </div>
          <ul className="mb-0">
            <li className="hover:bg-gray-200 font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3 cursor-pointer"
              onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                <span>Log Out</span>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default UserMenu;