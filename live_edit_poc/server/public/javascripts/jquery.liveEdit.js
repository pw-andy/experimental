(function($) {
    $.fn.liveEdit = function() {
        var LIVE_EDITOR_PROPS = "liveEditPropetiesKey"
        ,   EditorTypes = {textbox:0, list:1}
        ,   tabCount = 0
        ,   liveLabels = []
        ,   liveEditors = []
        ,   lastEdited = 0
        ,   i =0
        ,   Keys = {
                Tab: 9,
                Esc: 27,
                E: 69,
                L: 76,
                S: 83
            }
        ;

        function getLabelValue($el) {
            return $el.text() || $el.val();
        }

        function setLabelValue($el, value) {
            if(!value) {
                value = 'Click to edit...';
            }
            $el.text(value);
        }

        function createEditorFor($el) {
            var $editor = null
            ,   editorType = EditorTypes[$el.data('editor') || 'textbox']
            ,   listElements = null 
            ;
            
            if($el.data('elements'))
                listElements = $.parseJSON($el.data('elements').replace(/'/g, '"'));

            switch(editorType) {
                case EditorTypes.textbox:
                $editor = $('<input type="text" class="live-editor" />');
                break;

                case EditorTypes.list:
                    $editor = $('<select class="live-editor"></select>');
                    for(i = 0; i < listElements.length; ++i) {
                        var cur = listElements[i];
                        $editor
                            .append($('<option></option>')
                                    .attr('value', cur.k)
                                    .text(cur.v));
                    }
                break;
            }

            

            $editor.data(LIVE_EDITOR_PROPS, {
                type: editorType,
                boundElementId: $el.data(LIVE_EDITOR_PROPS).id,
                attached: false
            })

            return $editor;
        }

        function selectEditor($editor) {
            switch($editor.data(LIVE_EDITOR_PROPS).type) {
                case EditorTypes.textbox:
                    $editor.select();
                break;

                case EditorTypes.list:
                    $editor.focus();
                break;
            }
        }

        function resizeEditor($editor, $el) {
            switch($editor.data(LIVE_EDITOR_PROPS).type) {

                case EditorTypes.textbox: 
                    $editor.width($el.width()); 
                break;

                case EditorTypes.list:
                break;
            }
        }
        
        function isCtrlShift(evt) {
            return evt.ctrlKey && evt.shiftKey;
        }

        function editAtIndex(index) {
            if(liveLabels[index]) {
                liveLabels[index].click();
            }
        }

        function markLastLabelEdited($el) {
            lastEdited = $el.data(LIVE_EDITOR_PROPS).id;
        }

        function memoizeLastLabelValue($el) {
            $el.data(LIVE_EDITOR_PROPS).lastValue = getLabelValue($el);
        }

        function restoreLabelValue($el) {
            var value = $el.data(LIVE_EDITOR_PROPS).lastValue;
            setLabelValue($el, value);
        }

        function setEditorValueFromLabel($editor, $el) {
            
            switch($editor.data(LIVE_EDITOR_PROPS).type) {
                case EditorTypes.textbox:
                    $editor.val(getLabelValue($el));
                break;

                case EditorTypes.list:
                    $editor.children('option:contains(' + getLabelValue($el) +')').attr('selected', true);
                break;
            }
        }

        function setLabelValueFromEditor($el, $editor) {
            
            switch($editor.data(LIVE_EDITOR_PROPS).type) {
                case EditorTypes.textbox:
                    setLabelValue($el, $editor.val());
                    break;

                case EditorTypes.list:
                    setLabelValue($el, $editor.children('option:selected').text());
                    break;
            }
                
        }

        function attachEditor($editor, $parent) {
            $editor.data(LIVE_EDITOR_PROPS).attached = true;
            $editor.appendTo($parent);
        }

        function detachEditor($editor) {
            $editor.data(LIVE_EDITOR_PROPS).attached = false;
            $editor.detach();
        }

        function attachLabel($el, $parent) {
            $el.appendTo($parent);
        }

        function detachLabel($el) {
            $el.detach();
        }

        function isEditorAttached($editor) {
            return $editor.data(LIVE_EDITOR_PROPS).attached;
        }

       
        $(document).on('keydown', function(evt) {
            //console.log(evt.keyCode); 
            if(isCtrlShift(evt))
            {
                switch(evt.keyCode) {
                    case Keys.E:
                        editAtIndex(0);
                    break;

                    case Keys.L:
                        editAtIndex(lastEdited);
                    break;

                    case Keys.S:
                        alert('Saved!');
                    break;
                }
            }
        });

        return this.each(function() {
            var $this = $(this)
            , $children = $this.find('.live')
            ;
           
            $children.each(function() {
                $label = $(this);
                $label.data(LIVE_EDITOR_PROPS, {
                    tabOrder: tabCount,
                    id: tabCount
                });

                liveLabels[tabCount] = $label;
                liveEditors[tabCount] = createEditorFor($label);

                tabCount++;
            })

            $this        
                .on('click', '.live', function() {
                    var $this = $(this)
                    ,   $parent = $this.parent()
                    ,   $editor = liveEditors[$this.data(LIVE_EDITOR_PROPS).id]
                    ;

                    $('.live').removeClass('live-hover');

                    markLastLabelEdited($this);
                    memoizeLastLabelValue($this);
                    resizeEditor($editor, $this);
                    setEditorValueFromLabel($editor, $this); 
                    detachLabel($this);
                    attachEditor($editor, $parent);
                    selectEditor($editor);
                })
                .on('mouseenter', '.live', function() {
                        $(this).addClass('live-hover');
                })
                .on('mouseleave', '.live', function() {
                        $(this).removeClass('live-hover');
                })
                .on('blur', '.live-editor', function(evt) {
                    
                    var $this = $(this)
                    ,   $parent = $this.parent()
                    ,   $label = liveLabels[$this.data(LIVE_EDITOR_PROPS).boundElementId]
                    ;
                
                    if(!isEditorAttached($this)) return;

                    setLabelValueFromEditor($label, $this);
                    detachEditor($this);                
                    attachLabel($label, $parent);
                })
                .on('keydown', '.live-editor', function(evt) {
                    var $this = $(this)
                    ,   nextLabel = $this.data(LIVE_EDITOR_PROPS).boundElementId
                    ,   $label = null
                    ;

                    switch(evt.keyCode) {
                        case Keys.Tab:
                            // Shift key determines direction of tabbing
                            if(evt.shiftKey) {
                                if(--nextLabel < 0)  nextLabel = liveLabels.length - 1;
                            } else {
                                if(++nextLabel >= liveLabels.length) nextLabel = 0;
                            }

                            liveLabels[nextLabel].click();
                            return false;
                       
                        break;

                        case Keys.Esc: 
                            $this.blur();
                            $label = liveLabels[nextLabel];
                            restoreLabelValue($label);
                            return false;        
                        break;

                        default:
                            var value = null
                            ,   $measuringStick = $('<tester/>').css({
                                     position: 'absolute',
                                     top: -9999,
                                     left: -9999,
                                     width: 'auto',
                                     fontSize: $this.css('fontSize'),
                                     fontFamily: $this.css('fontFamily'),
                                     fontWeight: $this.css('fontWeight'),
                                     letterSpacing: $this.css('letterSpacing'),
                                     whiteSpace: 'nowrap'
                                }).appendTo($('body'));

                            switch($this.data(LIVE_EDITOR_PROPS).type) {
                                case EditorTypes.textbox:
                                    value = $this.val();
                                    $measuringStick.html(value);
                                    $this.width($measuringStick.width() + 15 + 'px');
                                break;
                            }

                            $measuringStick.remove();
                        break;
                    }
                });
            })
    }
    
})(jQuery);