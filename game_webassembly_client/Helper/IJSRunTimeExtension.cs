using Domain;
using Microsoft.JSInterop;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace game_webassembly_client.Helper
{
    public static class IJSRunTimeExtension
    {
        public static async ValueTask AppStart<T>(this IJSRuntime jSRuntime, DotNetObjectReference<T> objRef)
        where T:class{
            await jSRuntime.InvokeVoidAsync("appStart", objRef);
        }
        public static async ValueTask GenerateNewRound(this IJSRuntime jSRuntime, Candidate candidate)
        {
            await jSRuntime.InvokeVoidAsync("generateNewRound", candidate);
        }
        public static async ValueTask Method2(this IJSRuntime jSRuntime, string message)
        {
            await jSRuntime.InvokeVoidAsync("", "");
        }
    }
}
