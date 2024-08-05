import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Subject from './Subject';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';


function App() {
  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState([]); // Initialize items with an empty array
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw Error('Did not receive expected data'); 
        }
        const ListItems = await response.json();
        setItems(ListItems);
        setFetchError(null);

      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(async () => {
      await fetchItems();
    }, 2000);
    
  }, []);

  const handleCheck = async (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setItems(updatedItems);

    const myItem = updatedItems.filter((item) => item.id === id); 

    const updateOptions = {
      method : 'PATCH',
      headers :{
        'Content-Type' : 'application/json' 
      },
      body : JSON.stringify({checked : myItem[0].checked}),
    };
    const requrl = `${API_URL}/${id}`
    const Result = await apiRequest(requrl, updateOptions)
    if(Result){
      setFetchError(Result)
    }
  };

  const handleDelete = async (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    const deleteOptions ={
      method : 'DELETE',
    }

    const requrl = `${API_URL}/${id}`
    const Result = await apiRequest(requrl, deleteOptions)
    if(Result){
      setFetchError(Result)
  
  };
}

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return
    console.log(newItem)
    addItem(newItem) 
    setNewItem('') 
  }

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const ListItem = [...items, addNewItem];
    setItems(ListItem);

    const postOptions = {
      method : 'POST',
      headers :{
        'Content-Type' : 'application/json' 
      },
      body : JSON.stringify(addNewItem),

    }
    const Result = await apiRequest(API_URL, postOptions)
     if(Result){
      setFetchError(Result)
     }
  };

  return (
    <div>
      <Header />
      <AddItem
       newItem={newItem}
       setNewItem={setNewItem}
       addItem={addItem} 
       handleSubmit={handleSubmit}
       />
      <SearchItem 
      search={search} 
      setSearch={setSearch} 
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p>{`Error: ${fetchError}`}
          </p>}

        { !isLoading && !fetchError &&
        <Subject
          items={items.filter((item) =>
            item.item.toLowerCase().includes(search.toLowerCase())
          )}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        
        }
      </main>
     
      <Footer
        Length={items.length} />
      


        
    </div>
  );
}

export default App;