(function (Scratch) {
  'use strict';
  class OOPExtension {
    getInfo() {
      /*Scratch.vm.runtime._convertButtonForScratchBlocks = function (buttonInfo) {
        // for now we only support these pre-defined callbacks handled in scratch-blocks
        const supportedCallbackKeys = ['MAKE_A_LIST', 'MAKE_A_PROCEDURE', 'MAKE_A_VARIABLE'];
        /*if (supportedCallbackKeys.indexOf(buttonInfo.func) < 0) {
            log.error(`Custom button callbacks not supported yet: ${buttonInfo.func}`);
        }
        const maybeFormatMessage = function (maybeMessage, args, locale) {
          if (maybeMessage && maybeMessage.id && maybeMessage.default) {
              return formatMessage(maybeMessage, args, locale);
          }
          return maybeMessage;
        };      
        const xmlEscape = function (unsafe) {
          if (typeof unsafe !== 'string') {
              if (Array.isArray(unsafe)) {
                  // This happens when we have hacked blocks from 2.0
                  // See #1030
                  unsafe = String(unsafe);
              } else {
                  log.error('Unexpected input recieved in replaceUnsafeChars');
                  return unsafe;
              }
          }
          return unsafe.replace(/[<>&'"]/g, c => {
              switch (c) {
              case '<': return '&lt;';
              case '>': return '&gt;';
              case '&': return '&amp;';
              case '\'': return '&apos;';
              case '"': return '&quot;';
              }
          });
      };      
        const extensionMessageContext = this.makeMessageContextForTarget();
        const buttonText = maybeFormatMessage(buttonInfo.text, extensionMessageContext);
        return {
            info: buttonInfo,
            xml: `<button text="${xmlEscape(buttonText)}" callbackKey="${xmlEscape(buttonInfo.func)}"></button>`
        };
      }*/
      console.log("OOP extension by @timaaos. Download it on https://github.com/timaaos/OOPTurbowarp");
      return {
        id: 'oop',
        name: 'ObjectOrientedProgramming',
        blocks: [
          {
            opcode: 'class_labels',
            blockType: Scratch.BlockType.LABEL,
            text: 'Classes'
          },
          {
            opcode: 'class',
            blockType: Scratch.BlockType.HAT,
            text: 'Class [NAME]',
            arguments: {
              NAME: {
                defaultValue: 'Cat',
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'class_end',
            blockType: Scratch.BlockType.COMMAND,
            text: 'End class'
          },
          {
            opcode: 'class_init',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Init class [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: 'classes'
              }
            }
          },
          {
            opcode: 'function_labels',
            blockType: Scratch.BlockType.LABEL,
            text: 'Functions'
          },
          {
            opcode: 'class_func',
            blockType: Scratch.BlockType.CONDITIONAL,
            text: 'Function [NAME]',
            arguments: {
              NAME: {
                defaultValue: 'Meow',
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'call_obj',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Call function [FUNC] of [OBJ]',
            arguments: {
              FUNC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Meow'
              },
              OBJ: {
                type: Scratch.ArgumentType.STRING,
                menu: 'vars'
              }
            }
          },
          {
            opcode: 'props_labels',
            blockType: Scratch.BlockType.LABEL,
            text: 'Properties'
          },
          {
            opcode: 'class_prop',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Property [NAME] [VALUE]',
            arguments: {
              NAME: {
                defaultValue: 'age',
                type: Scratch.ArgumentType.STRING
              },
              VALUE: {
                defaultValue: '4',
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'property_obj',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Property [NAME] of [OBJ]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'age'
              },
              OBJ: {
                type: Scratch.ArgumentType.STRING,
                menu: 'vars'
              }
            }
          },
          {
            opcode: 'setProperty',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set property [NAME] of [OBJ] to [VALUE]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'age'
              },
              OBJ: {
                type: Scratch.ArgumentType.STRING,
                menu: 'vars'
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '5'
              }
            }
          },
          {
            opcode: 'thisprops_labels',
            blockType: Scratch.BlockType.LABEL,
            text: 'THIS Properties'
          },
          {
            opcode: 'this_property',
            blockType: Scratch.BlockType.REPORTER,
            text: 'THIS Property [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'age'
              }
            }
          },
          {
            opcode: 'set_this_property',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set THIS Property [NAME] to [VALUE]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'age'
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '5'
              }
            }
          }
        ],
        menus: {
          classes: 'dynClasses',
          vars: 'varList',
          properties: 'prop_list'
        }
      };
    }

    tryinit(){
      if(Scratch.oop == undefined){
        Scratch.oop = {
          classes:{},
          calldata:{},
          initdata:{}
        }
      }
    }
    getVarIdByName(name){
      var id = -1;
      for (const target of Scratch.vm.runtime.targets) {
        for (const variable of Object.values(target.variables)) {
            if(variable.name == name){
              return variable.id;
            }
        }
      }
      return id;
    }
    varList(){
      var l = [];
      for (const target of Scratch.vm.runtime.targets) {
        for (const variable of Object.values(target.variables)) {
            l.push(variable.name);
        }
      }    
      return l;
    }
    dynClasses(){
      this.tryinit();
      if(Object.keys(Scratch.oop.classes).length == 0){
        return ["No classes yet!"];
      }
      return Object.keys(Scratch.oop.classes);
    }
    class(args, util) {
      this.tryinit();
      if(!Object.keys(Scratch.oop.classes).includes(args.NAME)){
        Scratch.oop.classes[args.NAME] = {util: util, initprops: {}};
        Scratch.oop.initdata.class = args.NAME;
      }
      return ((Scratch.oop.calldata.type == 'init' && Scratch.oop.calldata.class == args.NAME) || (Scratch.oop.calldata.type == 'func' && Scratch.oop.calldata.class == args.NAME));
    }
    this_property(args, util) {
      this.tryinit();
      if(Scratch.oop.calldata.type == 'func' && Scratch.oop.calldata.obj != undefined){
        var res = this.getVarIdByName(Scratch.oop.calldata.obj);
        res = Scratch.vm.getVariableValue(util.target.id, res);
        return JSON.parse(res)[args.NAME];
      }
      return "undefined";
    }
    set_this_property(args, util) {
      this.tryinit();
      if(Scratch.oop.calldata.type == 'func' && Scratch.oop.calldata.obj != undefined){
        var vid = this.getVarIdByName(Scratch.oop.calldata.obj);
        var res = Scratch.vm.getVariableValue(util.target.id, vid);
        res = JSON.parse(res);
        res[args.NAME] = args.VALUE.toString();
        Scratch.vm.setVariableValue(util.target.id, vid, JSON.stringify(res));
        return true;
      }
      return "undefined";
    }
    
    async call_obj(args, util) {
      this.tryinit();
      var res = this.getVarIdByName(args.OBJ);
      res = Scratch.vm.getVariableValue(util.target.id, res);
      var cl = JSON.parse(res).__class;
      Scratch.oop.calldata = {type: "func", class: cl, func:args.FUNC , ready:false, result: {}, obj: args.OBJ};
      while(!Scratch.oop.calldata.ready){
        await this.__delay__(50);
      }
      Scratch.oop.calldata = {};
      return true;
    }
    class_func(args, util) {
      this.tryinit();
      if(Scratch.oop.calldata.type == 'func' && Scratch.oop.calldata.func == args.NAME){
        util.startBranch(1, false);
      }
      return false;
    }
    class_prop({NAME, VALUE}) {
      Scratch.oop.classes[Scratch.oop.initdata.class].initprops[NAME] = VALUE;
      //Scratch.oop.calldata.result[NAME] = VALUE;
      return true;
    }
    property_obj(args, util) {
      var res = this.getVarIdByName(args.OBJ);
      res = Scratch.vm.getVariableValue(util.target.id, res);
      return JSON.parse(res)[args.NAME];
    }
    setProperty(args, util){
      var vid = this.getVarIdByName(args.OBJ);
      var res = Scratch.vm.getVariableValue(util.target.id, vid);
      res = JSON.parse(res);
      res[args.NAME] = args.VALUE.toString();
      Scratch.vm.setVariableValue(util.target.id, vid, JSON.stringify(res));
      return true;
    }
    class_end() {
      Scratch.oop.calldata.ready = true;
      return true;
    }
    async __delay__(timer) {
      return new Promise(resolve => {
          timer = timer || 2000;
          setTimeout(function () {
              resolve();
          }, timer);
      });
    };
    class_init(args, util) {
      this.tryinit();
      console.log(util);
      var cl = Scratch.oop.classes[args.NAME];
      if(cl != undefined){
        /*Scratch.oop.calldata = {type: "init", class: args.NAME, ready:false, result:{__class: args.NAME}};
        while(!Scratch.oop.calldata.ready){
          await this.__delay__(50);
        }
        var r = Scratch.oop.calldata.result;
        Scratch.oop.calldata = {};*/
        var r = Scratch.oop.classes[args.NAME].initprops;
        r.__class = args.NAME;
        return JSON.stringify(r);
      }
      return "undefined";
    }
  }
  Scratch.extensions.register(new OOPExtension());
  Scratch.vm._events.BLOCK_DRAG_UPDATE.push(function(){if(Scratch.oop != undefined){Scratch.oop.classes = {}}})
})(Scratch);
