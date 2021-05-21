async function UpdateAbout(input, firebaseInstance) {
    const db = firebaseInstance.firestore();
    const ref = db.collection('about');
    
    try {
        await ref.doc('main').set({
            content: input,
        });

        return true;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}

export default UpdateAbout;