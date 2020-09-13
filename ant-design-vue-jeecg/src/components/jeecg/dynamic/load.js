let callbacks = []

function loadSuccess(key) {
  // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2144
  // check is successfully downloaded script
  return window[key]
}

const load = (src, type, callback) => {
  if(type=='link'){

    loadStyle(src, callback)
  }else{
    let loadKey = ''
    if(src.indexOf('tinymce')>=0){
      loadKey = 'tinymce'
    }else if(src.indexOf('codemirror')>=0){
      loadKey = 'CodeMirror'
    }
    const scriptTag = document.getElementById(src)
    //const cb = callback || function() {}
    if (!scriptTag) {
      const script = document.createElement('script')
      script.src = src // src url for the third-party library being loaded.
      script.id = src
      script.onload=()=>callback()
      script.onerror=()=>callback('加载失败：'+src)
      document.body.appendChild(script)
      //callbacks.push(cb)
     // const onEnd = 'onload' in script ? stdOnEnd : ieOnEnd
     // onEnd(script)
    }else{
      if (loadSuccess(loadKey)) {
        callback()
      }
    }

    if (scriptTag) {
     /* else {
        callbacks.push(cb)
      }*/
    }
  }

  function stdOnEnd(script) {
    script['onload'] = function() {
      // this.onload = null here is necessary
      // because even IE9 works not like others
      this.onerror = this.onload = null
      for (const cb of callbacks) {
        cb(null, script)
      }
      callbacks = null
    }
    script['onerror'] = function() {
      this.onerror = this.onload = null
      cb(new Error('Failed to load ' + src), script)
    }
  }

  function ieOnEnd(script) {
    script.onreadystatechange = function() {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
      this.onreadystatechange = null
      for (const cb of callbacks) {
        cb(null, script) // there is no way to catch loading errors in IE8
      }
      callbacks = null
    }
  }

  function loadStyle(src, callback) {
    const link = document.getElementById(src)
    if (!link) {
      const link = document.createElement('link')
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", src);
      link.id = src
      let heads = document.getElementsByTagName("head")
      if(heads.length){
        heads[0].appendChild(link)
      }else{
        document.documentElement.appendChild(link)
      }
    }
    callback();
  }

}

export default load
