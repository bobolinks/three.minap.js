let _context;

const AudioContext = {

	getContext: function () {

		if ( _context === undefined ) {
      if (wx && wx.createWebAudioContext) {
        _context = wx.createWebAudioContext();
      }
      if ( _context === undefined ) {
        _context = new ( window.AudioContext || window.webkitAudioContext )();
      }
		}

		return _context;

	},

	setContext: function ( value ) {

		_context = value;

	}

};

export { AudioContext };
