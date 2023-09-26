import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import Input from '../Input/Input'

import styles from './searchbar.module.sass';
import { useAppSelector } from '../../store';
import { setSelectedCity } from '../../store/slices/selected-city';
import { useState } from 'react';

const SearchBar = () => {
  const city = useAppSelector(state => state.selectedCity);

  const [search, setSearch] = useState(city.value);

  const dispatch = useDispatch();

  const handleSearch = () => {

    dispatch(setSelectedCity(search));
    setSearch('');
  }

  return (
    <>
      <Input value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
      }} placeholder='Search' className={styles.searchbar__input} />
      <Button onClick={() => handleSearch()} className={styles.searchbar__button}>Search</Button>
    </>
  )
}

export default SearchBar