import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppContext } from "./context/AppContext"
import { doc, getDoc, getFirestore } from "firebase/firestore"

import ItemDetail from "./ItemDetail"

const ItemDetailContainer = () => {
  const { products } = useAppContext()
  const [product, setProduct] = useState([])
  const { shoesId } = useParams()


  useEffect(() => {
    const db = getFirestore()

    const shoe = doc(db, 'items', shoesId)
    getDoc(shoe).then(res => {
      if (res.exists()) {
        setProduct({ id: res.id, ...res.data() })
      }
    })

  }, [shoesId, products])
  return (
    <div className="container h-auto max-w-4xl mx-auto my-8 bg-gray-50">
      <ItemDetail producto={product} />
    </div>
  )
}
export default ItemDetailContainer