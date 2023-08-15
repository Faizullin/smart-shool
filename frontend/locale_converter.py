import os, json
from googletrans import Translator, constants

vv=True
inp_lang = 'en'
output_lang = 'kk'
inp_path = './src/lang/en.json'
output_path = os.path.join('./src/lang',output_lang+'.json')
output_data = dict()

with open(inp_path,'r') as f:
    inp_data = json.loads(f.read())
if os.path.exists(output_path) and os.path.isfile(output_path):
    with open(output_path,'r') as f:
        output_data = json.loads(f.read())
old_keys = output_data.keys()
keys_to_lookup = [i for i in inp_data.keys() if not i in old_keys]
print("Want update",len(keys_to_lookup),"keys")

translator = Translator()
for key in keys_to_lookup:
    value = inp_data[key]
    translated_value = value
    try:
        translation = translator.translate(value, dest=output_lang, src=inp_lang)
        translated_value = translation.text
        if vv:
            print("Translated", value,"==>",translated_value)
    except Exception as err:
        print("Translate:",value,"==>",err)
    output_data[key] = translated_value
with open(output_path,'w+') as f:
    f.write(json.dumps(output_data))