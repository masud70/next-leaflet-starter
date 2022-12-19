import { getDocs, addDoc, collection, doc, getFirestore, getDoc, setDoc } from 'firebase/firestore'
import app from '../../../firebase/FireApp'

const handler = async (req, res) => {
    const { projectName, issueComment } = req.query

    const name = decodeURIComponent(projectName)
    const comment = decodeURIComponent(issueComment)

    // Get collection reference
    const db = getFirestore(app)
    const collRef = collection(db, 'projects')
    const snapshot = await getDocs(collRef)

    console.log("Post Issues >", name)

    const snapArray = []
    snapshot.forEach(item => snapArray.push(item))

    const arr = snapArray.filter(item => {
        return item.data().name === name
    })

    if(arr.length < 1) {
        res.status(404).json({error: 'The project does not exist.'})
        return;
    }

    const toPost = arr[0].data()
    // toPost.issue_count = toPost.issue_count + 1
    toPost.issues = [...toPost.issues, comment]

    const docRef = doc(collRef, arr[0].id)
    const snap = await setDoc(docRef, toPost)

    res.status(200).json(toPost)
}

export default handler