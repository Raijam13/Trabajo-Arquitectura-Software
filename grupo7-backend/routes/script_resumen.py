'''
# script.py
import requests
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords
#Aun falta un poco más de funcionalidad, por ahora la ID del vendedor es estática. 671ac23dfdd3b7d8c1d73b9a
variable_vendor = "671ac23dfdd3b7d8c1d73b9a"
url = f"http://localhost:3009/comentarios/{variable_vendor}"

def get_todo_comentarios():
    try:
        response = requests.get(url)
        if response.status_code == 200:
            # Procesar la respuesta
            return response.json()
        else:
            print("Error en la petición GET:", response.status_code)
            return []
    except requests.RequestException as e:
        print("Error en la petición GET:", e)
        return []

variable = get_todo_comentarios()
#Extraer solo comentarios
lista = [item['comentario'] for item in variable if 'comentario' in item]

#Realizar las peticiones get para tener una lista de comentarios

texto = " ".join(lista)

lista_oraciones = texto.split(".")#Dividir la oracion por puntos

lista_preprocesadas = [oracion.strip() for oracion in lista_oraciones if oracion.strip()]#Eliminar vacios al inicio y al final
# Vectorizar: Palabras que transformo a vector a través de TF-IDF
featurizer = TfidfVectorizer(
    stop_words=stopwords.words('spanish'),
    norm='l1'
)
def funcion_TextRank(lista):
    if len(lista) < 2:  # Verificar si hay suficientes oraciones para calcular
        return ' '.join(lista)
    #PASO 1: Tokenizar, TF-IDF y similitud conseno
    x = featurizer.fit_transform(lista)
    S = cosine_similarity(x)
    
    #PASO 2: Prevenir la división por cero y aumentar sus valores
    row_sums = S.sum(axis=1, keepdims=True)
    row_sums[row_sums == 0] = 1  # Evitar división por cero
    S = S / row_sums
    
    U = np.ones_like(S) / len(S)
    S = (1 - 0.15) * S + 0.15 * U#Aumentar valores

    # PASO 3: reemplazar NaNs (Nulos) o infs (infinitos - grandes)
    if np.isnan(S).any() or np.isinf(S).any():
        S = np.nan_to_num(S)
        #NaNs se reemplazan por 0.
        #infs se reemplazan por valores más grandes/mínimos permitidos.
    
    #PASO 4: Puntuar las palabras importantes
    eigenvals, eigenvecs = np.linalg.eig(S.T)
    scores = eigenvecs[:, 0].real
    
    # Ordenar índices por puntuaciones y escoger los primeros 5
    sort_idx = np.argsort(-scores)#Invertir el orden
    texto_completo = ". ".join(lista[i] for i in sort_idx[:4])
    return texto_completo

resumen_texto = funcion_TextRank(lista_preprocesadas)

print("resumen_texto: ", resumen_texto)

url2 = f"http://localhost:3009/resumen"

def post_todo_resumen():
    datos = {
            "vendedor": str(variable_vendor),
            "resumen":str(resumen_texto)
    }
    try:
        response = requests.post(url2, json=datos)
        if response.status_code in [200, 201]:
            # Procesar la respuesta
            print("El resumen se subio correctamente")
        else:
            print("Error en la petición post:", response.status_code)
            
    except requests.RequestException as e:
        print("Error en la petición post:", e)
        

post_todo_resumen()
'''