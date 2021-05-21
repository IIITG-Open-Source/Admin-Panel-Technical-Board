function FetchAbout(snapshot) {
    let about = '';

    if (snapshot) {
        about = snapshot.data().content;
    }
    
    return about;
}

export default FetchAbout;